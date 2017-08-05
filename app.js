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
        	//1.get the field inoout data
        		//2.add the item to budget controller
        		//3.add the new item to user interface
        		//4.calculate the budget
        		//5.need to display the budget on UI
        		console.log('fine');
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
	