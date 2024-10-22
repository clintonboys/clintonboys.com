(() => {
  // ns-hugo:/Users/clinton/Documents/technical/dev/portfolio-site/themes/hugo-liftoff/assets/js/components/switchTheme.js
  function switchTheme() {
    let themeSwitch = document.getElementById("themeSwitch");
    if (themeSwitch) {
      let initTheme = function() {
        let lsItem = localStorage.getItem("themeSwitch");
        let darkThemeSelected = false;
        if (lsItem !== null) {
          darkThemeSelected = lsItem === "dark";
        } else {
          darkThemeSelected = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        themeSwitch.checked = darkThemeSelected;
        resetTheme();
      }, resetTheme = function() {
        if (themeSwitch.checked) {
          document.body.setAttribute("data-theme", "dark");
          localStorage.setItem("themeSwitch", "dark");
        } else {
          document.body.removeAttribute("data-theme");
          localStorage.setItem("themeSwitch", "light");
        }
        if (typeof DISQUS !== "undefined") {
          DISQUS.reset({ reload: true });
        }
      };
      initTheme();
      themeSwitch.addEventListener("change", () => {
        resetTheme();
      });
    }
  }
  var switcher = (() => {
    switchTheme();
  })();

  // ns-hugo:/Users/clinton/Documents/technical/dev/portfolio-site/themes/hugo-liftoff/assets/js/components/clipboard.js
  var addCopyButtons = (clipboard2) => {
    document.querySelectorAll(".highlight > pre > code").forEach((codeBlock) => {
      const button = document.createElement("button");
      const svgCopy = '<svg role="img" aria-hidden="true" aria-labelledby="clipboardCopy" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><title id="clipboardCopy">Copy the code snippet contents</title><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
      const svgCheck = '<svg role="img" aria-hidden="true" aria-labelledby="clipboardCheckmark" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><title id="clipboardCheckmark">Code snippet contents copied</title><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
      button.className = "clipboard-button";
      button.type = "button";
      button.innerHTML = svgCopy;
      button.addEventListener("click", () => {
        let textToCopy = "";
        let codeBlockChildren = Array.from(codeBlock.children);
        codeBlockChildren.forEach(function(span) {
          textToCopy += span.lastChild.innerText;
        });
        clipboard2.writeText(textToCopy).then(
          () => {
            button.blur();
            button.innerHTML = svgCheck;
            setTimeout(() => button.innerHTML = svgCopy, 2e3);
          },
          (error) => button.innerHTML = "Error"
        );
      });
      const pre = codeBlock.parentNode;
      pre.parentNode.insertBefore(button, pre);
    });
  };
  var clipboard = (() => {
    if (navigator && navigator.clipboard) {
      addCopyButtons(navigator.clipboard);
    }
  })();

  // ns-hugo:/Users/clinton/Documents/technical/dev/portfolio-site/themes/hugo-liftoff/assets/js/components/toc.js
  var toggleToc = (() => {
    let tocToggle = document.getElementById("js-toc-toggle");
    let tocContents = document.getElementById("js-toc-contents");
    if (tocToggle) {
      tocToggle.addEventListener("click", () => {
        tocContents.classList.toggle("toc-contents--active");
      });
    }
  })();

  // ns-hugo:/Users/clinton/Documents/technical/dev/portfolio-site/themes/hugo-liftoff/assets/js/layouts/header.js
  function toggleNav() {
    let mainMenu = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");
    navBarToggle.addEventListener("click", () => {
      mainMenu.classList.toggle("menu--active");
      removeSubMenus();
    });
  }
  function toggleMobileMenu() {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(function(item) {
      item.addEventListener("click", () => {
        let subMenu = item.querySelector(".sub-menu");
        if (subMenu.classList.contains("sub-menu--active")) {
          subMenu.classList.remove("sub-menu--active");
        } else {
          removeSubMenus();
          subMenu.classList.add("sub-menu--active");
        }
      });
    });
  }
  function removeSubMenus() {
    let subMenus = document.querySelectorAll(".sub-menu");
    subMenus.forEach(function(sub) {
      if (sub.classList.contains("sub-menu--active")) {
        sub.classList.remove("sub-menu--active");
      }
    });
  }
  var header = (() => {
    toggleNav();
    toggleMobileMenu();
  })();

  // ns-hugo:/Users/clinton/Documents/technical/dev/portfolio-site/themes/hugo-liftoff/assets/js/pages/home.js
  function filterPosts() {
    let selectPosts = document.getElementById("select-posts");
    let entries = document.querySelectorAll(".post-entry-filter");
    if (selectPosts) {
      selectPosts.addEventListener("change", () => {
        entries.forEach(function(entry) {
          if (entry.classList.contains(`entry--${selectPosts.value}`) | selectPosts.value === "all-posts") {
            entry.style.display = "block";
          } else {
            entry.style.display = "none";
          }
        });
      });
    }
  }
  var home = (() => {
    filterPosts();
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovVXNlcnMvY2xpbnRvbi9Eb2N1bWVudHMvdGVjaG5pY2FsL2Rldi9wb3J0Zm9saW8tc2l0ZS90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3N3aXRjaFRoZW1lLmpzIiwgIm5zLWh1Z286L1VzZXJzL2NsaW50b24vRG9jdW1lbnRzL3RlY2huaWNhbC9kZXYvcG9ydGZvbGlvLXNpdGUvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvY29tcG9uZW50cy9jbGlwYm9hcmQuanMiLCAibnMtaHVnbzovVXNlcnMvY2xpbnRvbi9Eb2N1bWVudHMvdGVjaG5pY2FsL2Rldi9wb3J0Zm9saW8tc2l0ZS90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3RvYy5qcyIsICJucy1odWdvOi9Vc2Vycy9jbGludG9uL0RvY3VtZW50cy90ZWNobmljYWwvZGV2L3BvcnRmb2xpby1zaXRlL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2xheW91dHMvaGVhZGVyLmpzIiwgIm5zLWh1Z286L1VzZXJzL2NsaW50b24vRG9jdW1lbnRzL3RlY2huaWNhbC9kZXYvcG9ydGZvbGlvLXNpdGUvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvcGFnZXMvaG9tZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9Db2R5SG91c2UvZGFyay1saWdodC1tb2RlLXN3aXRjaFxuXG5mdW5jdGlvbiBzd2l0Y2hUaGVtZSgpIHtcbiAgbGV0IHRoZW1lU3dpdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lU3dpdGNoJyk7XG4gIGlmICh0aGVtZVN3aXRjaCkge1xuICAgIGluaXRUaGVtZSgpO1xuXG4gICAgdGhlbWVTd2l0Y2guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgcmVzZXRUaGVtZSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaW5pdFRoZW1lKCkge1xuICAgICAgbGV0IGxzSXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZVN3aXRjaCcpO1xuICAgICAgbGV0IGRhcmtUaGVtZVNlbGVjdGVkID0gZmFsc2U7XG4gICAgICBpZiAobHNJdGVtICE9PSBudWxsKSB7XG4gICAgICAgIGRhcmtUaGVtZVNlbGVjdGVkID0gbHNJdGVtID09PSAnZGFyayc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXJrVGhlbWVTZWxlY3RlZCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgIH1cblxuICAgICAgdGhlbWVTd2l0Y2guY2hlY2tlZCA9IGRhcmtUaGVtZVNlbGVjdGVkO1xuICAgICAgcmVzZXRUaGVtZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0VGhlbWUoKSB7XG4gICAgICBpZiAodGhlbWVTd2l0Y2guY2hlY2tlZCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZVN3aXRjaCcsICdkYXJrJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10aGVtZScpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWVTd2l0Y2gnLCAnbGlnaHQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgRGlzcXVzIHRvIG1hdGNoIG5ldyBjb2xvciBzY2hlbWVcbiAgICAgIGlmICh0eXBlb2YgRElTUVVTICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgRElTUVVTLnJlc2V0KHsgcmVsb2FkOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzd2l0Y2hlciA9ICgoKSA9PiB7XG4gIHN3aXRjaFRoZW1lKCk7XG59KSgpO1xuXG5leHBvcnQgeyBzd2l0Y2hlciB9OyIsICIvLyBBZGFwdGVkIGZyb20gdGhlIGZvbGxvd2luZyB0dXRvcmlhbHM6XG4vLyBodHRwczovL3d3dy5kYW5ueWd1by5jb20vYmxvZy9ob3ctdG8tYWRkLWNvcHktdG8tY2xpcGJvYXJkLWJ1dHRvbnMtdG8tY29kZS1ibG9ja3MtaW4taHVnby9cbi8vIGh0dHBzOi8vYWFyb25sdW5hLmRldi9ibG9nL2FkZC1jb3B5LWJ1dHRvbi10by1jb2RlLWJsb2Nrcy1odWdvLWNocm9tYS9cbi8vIGh0dHBzOi8vbG9nZmV0Y2guY29tL2h1Z28tYWRkLWNvcHktdG8tY2xpcGJvYXJkLWJ1dHRvbi9cblxuY29uc3QgYWRkQ29weUJ1dHRvbnMgPSAoY2xpcGJvYXJkKSA9PiB7XG4gIC8vIDEuIExvb2sgZm9yIHByZSA+IGNvZGUgZWxlbWVudHMgaW4gdGhlIERPTVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGlnaGxpZ2h0ID4gcHJlID4gY29kZScpLmZvckVhY2goKGNvZGVCbG9jaykgPT4ge1xuICAgIC8vIDIuIENyZWF0ZSBhIGJ1dHRvbiB0aGF0IHdpbGwgdHJpZ2dlciBhIGNvcHkgb3BlcmF0aW9uXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3Qgc3ZnQ29weSA9ICc8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjbGlwYm9hcmRDb3B5XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgdmVyc2lvbj1cIjEuMVwiIHdpZHRoPVwiMTZcIiBkYXRhLXZpZXctY29tcG9uZW50PVwidHJ1ZVwiPjx0aXRsZSBpZD1cImNsaXBib2FyZENvcHlcIj5Db3B5IHRoZSBjb2RlIHNuaXBwZXQgY29udGVudHM8L3RpdGxlPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTAgNi43NUMwIDUuNzg0Ljc4NCA1IDEuNzUgNWgxLjVhLjc1Ljc1IDAgMDEwIDEuNWgtMS41YS4yNS4yNSAwIDAwLS4yNS4yNXY3LjVjMCAuMTM4LjExMi4yNS4yNS4yNWg3LjVhLjI1LjI1IDAgMDAuMjUtLjI1di0xLjVhLjc1Ljc1IDAgMDExLjUgMHYxLjVBMS43NSAxLjc1IDAgMDE5LjI1IDE2aC03LjVBMS43NSAxLjc1IDAgMDEwIDE0LjI1di03LjV6XCI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTUgMS43NUM1IC43ODQgNS43ODQgMCA2Ljc1IDBoNy41QzE1LjIxNiAwIDE2IC43ODQgMTYgMS43NXY3LjVBMS43NSAxLjc1IDAgMDExNC4yNSAxMWgtNy41QTEuNzUgMS43NSAwIDAxNSA5LjI1di03LjV6bTEuNzUtLjI1YS4yNS4yNSAwIDAwLS4yNS4yNXY3LjVjMCAuMTM4LjExMi4yNS4yNS4yNWg3LjVhLjI1LjI1IDAgMDAuMjUtLjI1di03LjVhLjI1LjI1IDAgMDAtLjI1LS4yNWgtNy41elwiPjwvcGF0aD48L3N2Zz4nO1xuICAgIGNvbnN0IHN2Z0NoZWNrID0gJzxzdmcgcm9sZT1cImltZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGFyaWEtbGFiZWxsZWRieT1cImNsaXBib2FyZENoZWNrbWFya1wiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDaGVja21hcmtcIj5Db2RlIHNuaXBwZXQgY29udGVudHMgY29waWVkPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYig2MywgMTg1LCA4MClcIiBkPVwiTTEzLjc4IDQuMjJhLjc1Ljc1IDAgMDEwIDEuMDZsLTcuMjUgNy4yNWEuNzUuNzUgMCAwMS0xLjA2IDBMMi4yMiA5LjI4YS43NS43NSAwIDAxMS4wNi0xLjA2TDYgMTAuOTRsNi43Mi02LjcyYS43NS43NSAwIDAxMS4wNiAwelwiPjwvcGF0aD48L3N2Zz4nO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnY2xpcGJvYXJkLWJ1dHRvbic7XG4gICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ29weTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgdGV4dFRvQ29weSA9ICcnO1xuICAgICAgbGV0IGNvZGVCbG9ja0NoaWxkcmVuID0gQXJyYXkuZnJvbShjb2RlQmxvY2suY2hpbGRyZW4pXG4gICAgICBjb2RlQmxvY2tDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKHNwYW4pIHtcbiAgICAgICAgLy8gbGFzdENoaWxkIGlzIHJlcXVpcmVkIHRvIGF2b2lkIGNvcHlpbmcgbGluZSBudW1iZXJzXG4gICAgICAgIHRleHRUb0NvcHkgKz0gc3Bhbi5sYXN0Q2hpbGQuaW5uZXJUZXh0O1xuICAgICAgfSk7XG4gICAgICBjbGlwYm9hcmQud3JpdGVUZXh0KHRleHRUb0NvcHkpLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBidXR0b24uYmx1cigpO1xuICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBzdmdDaGVjaztcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IChidXR0b24uaW5uZXJIVE1MID0gc3ZnQ29weSksIDIwMDApO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IChidXR0b24uaW5uZXJIVE1MID0gJ0Vycm9yJylcbiAgICAgICk7XG4gICAgfSk7XG4gICAgLy8gMy4gQXBwZW5kIHRoZSBidXR0b24gZGlyZWN0bHkgYmVmb3JlIHRoZSBwcmUgdGFnXG4gICAgY29uc3QgcHJlID0gY29kZUJsb2NrLnBhcmVudE5vZGU7XG4gICAgcHJlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgcHJlKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjbGlwYm9hcmQgPSAoKCkgPT4ge1xuICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcbiAgICBhZGRDb3B5QnV0dG9ucyhuYXZpZ2F0b3IuY2xpcGJvYXJkKTtcbiAgfVxufSkoKTtcblxuZXhwb3J0IHsgY2xpcGJvYXJkIH07IiwgImNvbnN0IHRvZ2dsZVRvYyA9ICgoKSA9PiB7XG4gIGxldCB0b2NUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdG9jLXRvZ2dsZScpO1xuICBsZXQgdG9jQ29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdG9jLWNvbnRlbnRzJyk7XG5cbiAgaWYgKHRvY1RvZ2dsZSkge1xuICAgIHRvY1RvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRvY0NvbnRlbnRzLmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1jb250ZW50cy0tYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCB7IHRvZ2dsZVRvYyB9OyIsICIvLyBTaG93IG9yIGhpZGUgbmF2IG9uIGNsaWNrIG9mIG1lbnUgYnVyZ2VyXG5mdW5jdGlvbiB0b2dnbGVOYXYoKSB7XG4gIGxldCBtYWluTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tZW51Jyk7XG4gIGxldCBuYXZCYXJUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmF2YmFyLXRvZ2dsZScpO1xuXG4gIG5hdkJhclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtYWluTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LS1hY3RpdmUnKTtcbiAgICByZW1vdmVTdWJNZW51cygpO1xuICB9KTtcbn1cblxuLy8gU2hvdyBvciBoaWRlIG1lbnUgaXRlbXMgb24gbW9iaWxlXG5mdW5jdGlvbiB0b2dnbGVNb2JpbGVNZW51KCkge1xuICBsZXQgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbScpO1xuXG4gIG1lbnVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IHN1Yk1lbnUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudScpO1xuICAgICAgaWYgKHN1Yk1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItbWVudS0tYWN0aXZlJykpIHtcbiAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzdWItbWVudS0tYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVTdWJNZW51cygpO1xuICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5hZGQoJ3N1Yi1tZW51LS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIENvbGxhcHNlIHN1Ym1lbnVzXG5mdW5jdGlvbiByZW1vdmVTdWJNZW51cygpIHtcbiAgbGV0IHN1Yk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Yi1tZW51Jyk7XG4gIHN1Yk1lbnVzLmZvckVhY2goZnVuY3Rpb24oc3ViKSB7XG4gICAgaWYgKHN1Yi5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1tZW51LS1hY3RpdmUnKSkge1xuICAgICAgc3ViLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51LS1hY3RpdmUnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBoZWFkZXIgPSAoKCkgPT4ge1xuICB0b2dnbGVOYXYoKTtcbiAgdG9nZ2xlTW9iaWxlTWVudSgpO1xufSkoKTtcblxuZXhwb3J0IHsgaGVhZGVyIH07IiwgImZ1bmN0aW9uIGZpbHRlclBvc3RzKCkge1xuICBsZXQgc2VsZWN0UG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LXBvc3RzJyk7XG4gIGxldCBlbnRyaWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3QtZW50cnktZmlsdGVyJyk7XG4gIGlmIChzZWxlY3RQb3N0cykge1xuICAgIHNlbGVjdFBvc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICBpZiAoZW50cnkuY2xhc3NMaXN0LmNvbnRhaW5zKGBlbnRyeS0tJHtzZWxlY3RQb3N0cy52YWx1ZX1gKSB8IHNlbGVjdFBvc3RzLnZhbHVlID09PSAnYWxsLXBvc3RzJykge1xuICAgICAgICAgIGVudHJ5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudHJ5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGhvbWUgPSAoKCkgPT4ge1xuICBmaWx0ZXJQb3N0cygpO1xufSkoKTtcblxuZXhwb3J0IHsgaG9tZSB9OyJdLAogICJtYXBwaW5ncyI6ICI7O0FBRUEsV0FBUyxjQUFjO0FBQ3JCLFFBQUksY0FBYyxTQUFTLGVBQWUsYUFBYTtBQUN2RCxRQUFJLGFBQWE7QUFPZixVQUFTLFlBQVQsV0FBcUI7QUFDbkIsWUFBSSxTQUFTLGFBQWEsUUFBUSxhQUFhO0FBQy9DLFlBQUksb0JBQW9CO0FBQ3hCLFlBQUksV0FBVyxNQUFNO0FBQ25CLDhCQUFvQixXQUFXO0FBQUEsUUFDakMsT0FBTztBQUNMLDhCQUFvQixPQUFPLFdBQVcsOEJBQThCLEVBQUU7QUFBQSxRQUN4RTtBQUVBLG9CQUFZLFVBQVU7QUFDdEIsbUJBQVc7QUFBQSxNQUNiLEdBRVMsYUFBVCxXQUFzQjtBQUNwQixZQUFJLFlBQVksU0FBUztBQUN2QixtQkFBUyxLQUFLLGFBQWEsY0FBYyxNQUFNO0FBQy9DLHVCQUFhLFFBQVEsZUFBZSxNQUFNO0FBQUEsUUFDNUMsT0FBTztBQUNMLG1CQUFTLEtBQUssZ0JBQWdC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
