---
layout: post
title: Scraping Gumtree
image:
  feature: sample-image-9.jpg
  credit: Cascade Mountains, Oregon, 2013
---

Gumtree.com.au is a trading post website, largely used by private sellers interacting with each other off-site to sell used goods. One particularly common use for Gumtree is concert tickets: this is one of the main uses I have for it. 

The site is however fairly lightweight, and doesn't have any sort of notifications system for a particular search. So when looking for tickets to a particular concert, say, you have to search the site constantly and see if there are any new results.

I decided to learn some basic web-scraping techniques to write a script that did all this work for me. I wanted the following features:

1. To specify a keyword (e.g. "arctic monkeys"). 
2. To have the script crawl Gumtree every $$x$$ minutes. 
3. To email me with any new results (within particular geographic areas or price brackets). 

### Scraping Gumtree

I'd not done much web scraping before but I'd heard good things about BeautifulSoup in Python to parse the scraped html, together with the requests package to actually scrape the pages. Since I was looking for tickets to a particular show, I used the following parameters, which could of course be altered depending on the user's requirements:

    artist="arctic+monkeys"
    city="sydney"
    URL_START='http://www.gumtree.com.au'
    OFFER_CHOICE=['k0?ad=offering','k0?ad=wanted']
    ARTIST_URL="arctic+monkeys"#re.sub("\s",+,artist)

I then used the requests package to scrape a gumtree results page and dump the JSON output; this scrapes the $n$th result page (Gumtree limits to 10 results per page). 

    def scrape_gumtree_page_n(n):
        current_time=int(time.time())
        pageURL='{0}/s-{1}+{2}/page-{3}/{4}'.format(URL_START,ARTIST_URL,city,n,OFFER_CHOICE[0])
        savePath=os.path.join(scrapings_dir,"{0}.html".format(current_time))
        results=requests.get(pageURL)
        results_file=open(savePath,'w')
        with results_file:
            results_file.write(results.text.encode('utf-8',errors='ignore'))
        return savePath

There was then a simple while loop to run this over all results pages. 

### Parsing JSON using BeautifulSoup

Having obtained a whole bunch of messy output from the scraper, I used the following code to parse using BeautifulSoup:

    def html_parser(filename):
        gumtree_file=open(filename)
        gumtree_contents=gumtree_file.read()
        gtsoup=BeautifulSoup(gumtree_contents)
	    master_list=[]
	    gt_li=gtsoup.findAll('li', attrs={'class': 'js-click-block'})
	    for node in gt_li:
	        if len(node.contents) > 0:
	            post_dict={}
	            if node.findAll('a') is not None:
	                post_dict['title']=node.findAll('a')[0].string
	            if node.find('div',attrs={"class":"h-elips"}) is not None:
	                post_dict['price']=node.find('div',attrs={"class":"h-elips"}).string
	            if node.findAll('span') is not None:
	                post_dict['description']=node.findAll('span')[0].contents[0]
	            if node.find('h3',attrs={"class":"rs-ad-location"}) is not None:
	                post_dict['location1']=node.find('h3',attrs={"class":"rs-ad-location-area"}).contents[0]
	            if node.find('span',attrs={"class":"rs-ad-location-suburb"}) is not None:
	                post_dict['location2']=node.find('span',attrs={"class":"rs-ad-location-suburb"}).contents[0]
	            if node.find('div',attrs={"class":"rs-ad-date"}) is not None:
	                post_dict['date']=node.find('div',attrs={"class":"rs-ad-date"}).contents[0]
	            anchors=node.findAll('a')
	            for node in anchors:
	                if node.get("data-adid") is not None:
	                    post_dict['ad_id']=node.get('data-adid')
	            master_list.append(post_dict)
	    return master_list


This returned things like

	{"ad_id": "1048303295", 
	 "description": "Selling: 2 Coldplay Tickets - Sydney 19 June ",
	 "title": null, 
	 "price": "\n500", 
	 "location2": "St Ives Chase", 
	 "date": "\n04/06/2014"}

which contains all the relevant information. This took me a while to write as I'd not dealt with JSON much before, so I had to figure everything out from scratch. It was very satisfying to run the parser successfully and have big page-sized chunks of horrible JSON condensed into little search result nuggets like the above.

### Mandrill email automation

I wanted to run the scraper constantly in the background, preferably on an Amazon Web Server instance, and have it send automated emails every time it found a new result. I had to register a Mandrill account to use their API; once an API key was generated I wrote the following very basic email template:

	def new_result_email(result,artist,city):
	    subj=artist+' '+city
	    body=json.dumps(result)
	    message = {
	     'from_email': '...',
	     'from_name': 'Clinton Boys',
	     'headers': {'Reply-To': '...'},
	     'important': True,
	     'preserve_recipients': None,
	     'return_path_domain': None,
	     'signing_domain': None,
	     'subject': subj,
	     'text': body,
	     'to': [{'email': '...',
	             'name': 'Clinton Boys',
	             'type': 'to'}],
	    }
	    result = mandrill_client.messages.send(message=message)
	    print(result)

which I called in my function "regular_scraping":

	def regular_scraping():
	    json_file=open('master_file.text',"r")
	    json_file_contents= json_file.read()
	    if not os.stat('master_file.text')[6]==0:
	        old_data=json.loads(json_file_contents)
	    else:
	        old_data=[]
	    this_scrape=[]
	    for n in range(1,pages_to_scrape()+1):
	        this_scrape.append(html_parser(scrape_gumtree_page_n(n)))
	        data_ids=[]
	        new_entries=[]
	        new_entry_count=0
	        for entry in old_data:
	            data_ids.append(entry[u'ad_id'])
	        for entry in this_scrape[n-1]:
	            if entry[u'ad_id'] not in data_ids:
	                old_data.append(entry)
	                new_entry_count += 1
	                new_entries.append(entry)
	                new_result_email(entry,artist,city)
	    json_file.close()
	    json_file=open('master_file.text',"w")
	    json_file.write(json.dumps(old_data))
	    json_file.close()

The last step was to set this up on an Amazon Web Server instance: I made a master file which put all these ingredients together: every $$x$$ seconds (by default I chose 120), it ran the scraper across all results pages, looked through the neatened JSON for results, compared these to a master results file on disk, and if there were any new results, added to the file and sent an email through Mandrill. This was easy enough to set up, although there's still a bunch of memory leak issues because my code isn't great; after a while it will eventually crash the AWS instance. It did solve my initial problem though, which was the whole point of the exercise, and I did learn a whole lot of new techniques. 








