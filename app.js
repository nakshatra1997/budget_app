//BUDGET CONTROLLER
var budgetController=(function()
	{
        // var x=23;
        // var add=function (a)
        // {
        //    return x+a;
        // }
        // return                                    //just to explain abstraction 
        // {
        // 	publicTest:function( b )
        // 	{
        // 		return add(b);
        // 	}
        // }
        var Expense=function(id,description,value)
        {
           this.id=id;
           this.description=description;
           this.value=value;
        }
        var Income=function(id,description,value)
        {
           this.id=id;
           this.description=description;
           this.value=value;
        }
        var data={
        	allItems:{
        		exp:[],
        		inc:[]
        	},
        	totals:
        	{
        		exp:0,
        		inc:0
        	}
        };
        //now lets add one public method that allows
        // other modules to enter new item in data
        return {
        	addItem:function(type,des,val)
        	{
                var newItem,ID;
                //ID IS USED TO GIVE EACH ITEM A UNIQUE NUMBER
                //create new id
                if(data.allItems[type].length>0)
                {
                	ID=data.allItems[type][data.allItems[type].length-1].id+1;
                }
                else
                {
                	ID=0;
                }
                
                //create new item based on 'inc' or 'exp'
                if(type==='exp')
                {
                	newItem=new Expense(ID,des,val);
                }
                else if(type==='inc')
                {
                	newItem=new Income(ID,des,val);
                }
                //push it into our data structure
                data.allItems[type].push(newItem);
                //return the new element
                return newItem; 
        	},
        	testing:function()
        	{
        		console.log(data);
        	}
        };
	})();
//UI CONTROLLER
var UIController=(function()
	{
          //some thing
          //since we will use the functions of UI controller we need not to create it as private
          //it has to be public so for this we will return object (see the above xample)
          var DOMstrings={
          	inputType:'.add__type',
          	inputDescription:'.add__description',
          	inputValue:'.add__value',
          	inputBtn:'.add__btn',
          	incomeContainer:'.income__list',
          	expensesContainer:'.expenses__list'
          };
          return{
          
                  getInput: function()
	               {
	               	  // var type=document.querySelector('.add__type').value;//will be either inc or exp
	               	  // var description=document.querySelector('.add__description').value;
	               	  // var value=document.querySelector('.add__value').value;
	               	  //now in this case we have to return three diff values
	               	  //so for this the best solution is to return an object containing these values
	               	  
		               	  var obj={
		               	  	  type: document.querySelector(DOMstrings.inputType).value,
			                  description: document.querySelector(DOMstrings.inputDescription).value,  //error fixed by using obj
			               	  value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
		               	  };
		               	  return obj;
	               },
	               addItemList:function(obj,type)
	               {
                     var html,newHtml,element;
                     //create html string with placeholder text
                     if(type==='inc')
                     {
                          element=DOMstrings.incomeContainer;
                          html='<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                     }
                     else if(type==='exp')
                     {
                          element=DOMstrings.expensesContainer;
                          html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                     }

                     //replace the placeholder text with some actual data

                     newHtml=html.replace('%id%',obj.id);
                     newHtml=newHtml.replace('%description%',obj.description);
                     newHtml=newHtml.replace('%value%',obj.value);
                    
                    
                     //insert the html into dom (using insertAdjacentHTML)

                     document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
	               },
	               clearFields:function()
	               {
                      var fields,fieldsArr;
                      fields=document.querySelector(DOMstrings.inputDescription +','+DOMstrings.inputValue);
                      //the problem is fields is a list not array
                      //we can not use slice function on list(fields.slice ----it is wrong) it for arrays
                      //what we can do is to use call function (see below)
                      fieldsArr=Array.prototype.slice.call(fields);
                      fieldsArr.forEach(function(current,index,array)
                      	{
                            current.value="";
                      	});
                      fieldsArr[0].focus();
	               },
	               getDOMstrings:function()
	               {
	               	   return DOMstrings;
	               }

          };



	})();
//GLOBAL APP CONTROLLER

var controller=(function(budgetCtrl,UICtrl)
	{
        // var z=budgetCtrl.publicTest(5);
        // return
        // {
        // 	anotherPublic:function()    //just to explain abstraction 
        // 	{
        // 		console.log(z);
        // 	}
        // }
        var setupEventListeners= function()
        {
	         var DOM=UICtrl.getDOMstrings();
	         document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
	         document.addEventListener('keypress',function(event)
	         {
	             if(event.keyCode===13||event.which===13) //which we have used for older browser coz they dont support
	             	                                      //keycode property
	             {
	             	ctrlAddItem();
	             }

	         });	
        };
        var updateBudget=function()
        {
                //1.calculate the budget
                //2. return the budget
        		//3.need to display the budget on UI
        };

        var ctrlAddItem=function()
        {
	        	var input,newItem;
	        	//1.get the field input data
	        	input=UICtrl.getInput();
	        	if(input.description!===""&& !isNaN(input.value)&&input.value>0)
	        	{
	        	    //2.add the item to budget controller
	        		newItem=budgetCtrl.addItem(input.type,input.description,input.value);
	        		//3.add the new item to user interface
	        		UICtrl.addItemList(newItem,input.value);
	        		//3* clear the input fields
	        		UICtrl.clearFields();
	        		//4.calculate and update budget
	                updateBudget();
	        	}
        		
        		
        };

        return
        {
        	init: function()                      //why this is showing error
        	{
        		console.log('app has started');
               // setupEventListeners();
        	}
        };
        
	})(budgetController,UIController);

controller.init();
	