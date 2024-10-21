---
layout: post
title: Fixing the Trendy scraper
image:
  feature: sample-image-13.jpg
  credit: Wellington, New Zealand, 2014
---

My [Google trends scraper]({{ site.baseurl }}{% link _posts/2015-01-12-google-trends-scraper.md %}) is the most popular post on this site, and I've been getting questions about it for the last year or so, ever since Google changed the way the data is pulled and displayed on the [trends site](https://trends.google.com/trends/explore).

I finally found some free time, worked out how Google had changed the API behind the scenes, and changed my trendy scraper to work with the new version. I dramatically improved the code at the same time. Thanks to everyone who was interested! 

# Changes to the code

The way the code works is as follows:

- when you visit https://trends.google.com/trends/explore and request a graph, you make a call to the Google trends explore API which generates for you a usage token (valid only for this page view) 
- when you click export, you make a call to a different API, using this token


```
def get_data(bucket_start_date,bucket_end_date, keyword):
    bucket_start_date_printed = datetime.strftime(bucket_start_date, '%Y-%m-%d')
    bucket_end_date_printed = datetime.strftime(bucket_end_date, '%Y-%m-%d')
    time_formatted = bucket_start_date_printed + '+' + bucket_end_date_printed

    req = {"comparisonItem":[{"keyword":keyword, "geo":geo, "time": time_formatted}], "category":category,"property":""}
    hl = "en-GB"
    tz = "-120"

    explore_URL = 'https://trends.google.com/trends/api/explore?hl={0}&tz={1}&req={2}'.format(hl,tz,json.dumps(req).replace(' ','').replace('+',' '))
    print explore_URL
    print requests.get(explore_URL).text.encode('utf8')
    return requests.get(explore_URL).text
```

This function simulates the first API call and stores the response as a string. 

```
def get_csv(response_text):
    request = get_csv_request(response_text)
    token = get_token(response_text)

    csv = requests.get('https://www.google.com/trends/api/widgetdata/multiline/csv?req={0}&token={1}&tz=-120'.format(request,token))
    return csv.text.encode('utf8')

def parse_csv(csv_contents):
    lines = csv_contents.split('\n')
    df = pd.DataFrame(columns = ['date','value'])
    dates = []
    values = []
    # Delete top 3 lines
    for line in lines[3:]:
        try:
            dates.append(line.split(',')[0].replace(' ',''))
            values.append(line.split(',')[1].replace(' ',''))
        except:
            pass
    df['date'] = dates
    df['value'] = values
    print df.head()
    return df   
```

These two functions then parse the response, pull the token and the request for the CSV and then simulates the second API call, saving the results as a pandas dataframe (much better than the previous code which had to actually save all the files to a local folder).

The rest of the code is basically the same: you can read about the stitching process in the original [post]({{ site.baseurl }}{% link _posts/2015-01-12-google-trends-scraper.md %}). 


