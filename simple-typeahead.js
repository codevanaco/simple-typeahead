$(document).ready(function () {

    console.log("hello world");
    var uniqueTypeahead =  "";

    $.typeahead({
        input: '.js-typeahead-beer_v1',
        minLength: 1,
        maxItem: 15,
        order: "asc",
        hint: true,
        group: {
            template: "{{group}} beers! see more"
        },
        maxItemPerGroup: 5,
        backdrop: {
            "background-color": "#fff"
        },
        href: "/beers/{{group|slugify}}/{{display|slugify}}/",
        dropdownFilter: true,
        emptyTemplate: 'No result for "{{query}}"',
        template: '<div><span>{{query}} > {{group}} > {{display}}</span></div>',
        //   display: ['products'],
        source: {
            "products": {
                ajax: {
                    url: "beer.json",
                    path: "data.beer.ale"
                }
            },
            "invoices": {
                ajax: {
                    url: "beer.json",
                    path: "data.beer.lager"
                }
            },
            "orders": {
                ajax: {
                    url: "beer.json",
                    path: "data.beer.stout"
                }
            }
        },
        callback: {
            onInit: function () {
                

            },
            onLayoutBuiltAfter: function(){
                if(document.getElementsByClassName('typeahead__list')[0]){
            
                   var temp_count = document.getElementsByClassName('typeahead__list')[0].children.length;

                   if(temp_count === 6){
                    console.log('see more!');
                   }
                 
                }
            },
            onReady: function () {

                /* fire 'product' click hack */
                function eventFire(el, etype) {

                    console.log('click event fired')
                    if (el.fireEvent) {
                        el.fireEvent('on' + etype);
                    } else {
                        var evObj = document.createEvent('Events');
                        evObj.initEvent(etype, true, false);
                        el.dispatchEvent(evObj);
                    }
                }
                var parent = document.getElementsByClassName('group-products')[0];
                var son = parent.firstChild;
                eventFire(son, 'click');

            },
            onClickAfter: function (node, a, item, event) {

                //console.log('after element has been clicked');
                event.preventDefault;

                // href key gets added inside item from options.href configuration
                alert(item.href);

            },
            onDropdownFilter: function (node, a, item, event) {
        
                //console.log("onDropdownFilter::"+uniqueTypeahead);
            },
            onLayoutBuiltBefore: function (node, a, item, event) {
              
                //console.log("layoutBuiltBefore::"+uniqueTypeahead);
             
            },
            onSearch: function (node, a, item, event) {

                //console.log('onSearch');
                //console.log("search::"+uniqueTypeahead);
                
            }

        },
        selector: {

            filter: "typeahead__filter2",
            filterButton: "typeahead__filter-button2",

        },
        debug: true
    });

});

/*if(document.getElementsByClassName('typeahead__list')[0]){
                    console.log(document.getElementsByClassName('typeahead__list')[0].children.length);
                }else{
                    console.log("not registered yet!");
                }*/