# paging_bootstrap


Usage
=====

Just include `paging_bootstrap.js` and call the `paging` function on the pagination element like this:

```javascript
$(function () {
            $('#paging').paging(option);
        });
        
    Option = {
        total: 100,
        count: 8,
        index: 1,
        callback: null  //callbac(index,  pageTurning), index is current page; pageTurning is a function with no parameter, must use to reset paging.
    };
    
    
```

```html
<div id="paging"></div>
```
