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




	})();
//UI CONTROLLER
var UIController=(function()
	{
          //some thing
          //since we will use the functions of UI controller we need not to create it as private
          //it has to be public so for this we will return object (see the above xample)
          return{
          
                  getInput: function()
	               {
	               	  // var type=document.querySelector('.add__type').value;//will be either inc or exp
	               	  // var description=document.querySelector('.add__description').value;
	               	  // var value=document.querySelector('.add__value').value;
	               	  //now in this case we have to return three diff values
	               	  //so for this the best solution is to return an object containing these values
	               	  
		               	  var obj={
		               	  	  type: document.querySelector('.add__type').value,
			                  description: document.querySelector('.add__description').value,
			               	  value: document.querySelector('.add__value').value
		               	  };
		               	  return obj;
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
        var ctrlAddItem=function()
        {
        	//1.get the field inpout data
        	var input=UICtrl.getInput();
        		//2.add the item to budget controller
        		//3.add the new item to user interface
        		//4.calculate the budget
        		//5.need to display the budget on UI
        		console.log(input);
        }
        document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

         document.addEventListener('keypress',function(event)
         {
             if(event.keyCode===13||event.which===13)//which we have used for older browser coz they dont support
             	//keycode property
             {
             	ctrlAddItem();
             }

         })
	})(budgetController,UIController);
	