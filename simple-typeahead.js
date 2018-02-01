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
                    url: "http://localhost:3000/data",
                    path: "beer.ale"
                }
            },
            "invoices": {
                ajax: {
                    url: "http://localhost:3000/data",
                    path: "beer.lager"
                }
            },
            "orders": {
                ajax: {
                    url: "http://localhost:3000/data",
                    path: "beer.stout"
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
                    // do what we need here
                    var li_element = document.createElement('li');
                    var li_element_a_link = document.createElement('a');
                    li_element_a_link_node = document.createTextNode('See more');

                    var firstChild = document.getElementsByClassName('typeahead__list')[0].firstChild;
                    var firstChildAttribute = firstChild.getAttribute("data-search-group");
                    var uniqueUrl;

                    if(firstChildAttribute === "products"){
                        uniqueUrl = "/products";
                    }else if(firstChildAttribute === "invoices"){
                        uniqueUrl = "/invoices";
                    }else{
                        //orders
                        uniqueUrl = "/orders";
                    }

                    li_element_a_link.setAttribute('href', uniqueUrl);
                    li_element_a_link.setAttribute('class', 'typeahead-seemore');
                    li_element_a_link.appendChild(li_element_a_link_node);

                    li_element.appendChild(li_element_a_link);
                    document.getElementsByClassName('typeahead__list')[0].appendChild(li_element);

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
                
            },
            onReceiveRequest: function(node, a, item, event){
                console.log("REQUEST COMPLETED!!!!");
            },
            onSendRequest: function(node, a, item, event){
                console.log("REQUEST SENT!!!!");

                document.getElementsByClassName('js-typeahead-beer_v1')[0].style.backgroundImage = "none";
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