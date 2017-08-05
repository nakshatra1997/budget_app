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
        }
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
          	inputBtn:'.add__btn'
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
			               	  value: document.querySelector(DOMstrings.inputValue).value
		               	  };
		               	  return obj;
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
	             if(event.keyCode===13||event.which===13)//which we have used for older browser coz they dont support
	             	//keycode property
	             {
	             	ctrlAddItem();
	             }

	         });	
        };
     
        var ctrlAddItem=function()
        {
        	//1.get the field inpout data
        	var input=UICtrl.getInput();
        		//2.add the item to budget controller
        		//3.add the new item to user interface
        		//4.calculate the budget
        		//5.need to display the budget on UI
        };

        return
        {
        	init:function()                      //why this is showing error
        	{
        		console.log('app has started');
                setupEventListeners();
        	}
        };
        
	})(budgetController,UIController);

controller.init();
	