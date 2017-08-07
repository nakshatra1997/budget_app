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
           this.percentage=-1;
        };
        Expense.prototype.calcPerc=function(totalIncome)
        {
        	if(totalIncome>0)
        	{
        	   this.percentage=Math.round((this.value/totalIncome)*100);
        	}else
        	{
        		this.percentage=-1;
        	}
         };
         Expense.prototype.getPercentage=function()
         {
            return this.percentage;
         };  
        var Income=function(id,description,value)
        {
           this.id=id;
           this.description=description;
           this.value=value;
        };
        var calculateTotal=function(type)
        {
            var sum=0;
            data.allItems[type].forEach(function(cur)
            	{
            		sum=sum+cur.value;
            	});
            data.totals[type]=sum;
        };
        var data={
        	allItems:{
        		exp:[],
        		inc:[]
        	},
        	totals:
        	{
        		exp:0,
        		inc:0
        	},
        	budget:0,
        	percentage:-1
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
        	deleteItem:function(type,id)
        	{
        		var ids,index;
                ids=data.allItems[type].map(function(current)
                {
                   return current.id;
                });//map returns a new array
        	     index=ids.indexOf(id);
        	     if(index!==-1)
        	     {
        	     	data.allItems[type].splice(index,1);//1 is used for deleting just 1 item
        	     }
        	},
        	calculateBudget:function()
        	{
               //calculate total income and expenses
               calculateTotal('exp');
               calculateTotal('inc');
               //calculate the budget:income-expenses
               data.budget=data.totals.inc-data.totals.exp;

               //calculate the percentage of income that we spent
               if(data.totals.inc>0)
               {
                	data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);

               }
               else
               {
                 	data.percentage=-1;
               }

        	},
        	calculatePercentages:function()
        	{
                data.allItems.exp.forEach(function(curr)
                	{
                        curr.calcPerc(data.totals.inc);
                	});
        	},
        	getPercentages:function()
        	{
               var allPerc=data.allItems.exp.map(function(curr)
               	{
               		return curr.getPercentage();
               	});
               return allPerc;
        	}, 
        	getBudget:function()
        	{
               
               var obj1={
               	  budget:data.budget,
                  totalInc:data.totals.inc,
                  totalExp:data.totals.exp,
                  percentage:data.percentage
               };
               return obj1;
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
          	expensesContainer:'.expenses__list',
          	budgetLabel:'.budget__value',
          	incomeLabel:'.budget__income--value',
          	expensesLabel:'.budget__expenses--value',
          	percentageLabel:'.budget__expenses--percentage',
          	container:'.container',
          	expensesPercLabel:'.item__percentage',
          	dateLabel:'.budget__title--month'
          };
           var formatNumber=function(num,type)
                    {
                    	var numSplit,int,dec;
                        //+ or- before the number
                        //exactly  2 decimal points
                        //comma separating the thousands
                        num=Math.abs(num);
                        num=num.toFixed(2);
                        numSplit=num.split('.');
                        int=numSplit[0];
                        if(int.length>3)
                        {
                        	int=int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
                        }
                        dec=numSplit[1];
                      
                        return (type==='exp'?sign='-':sign='+')+''+int+'.'+dec;
                    };
             var nodeListForEach=function(list,callback)
                {
                  	for(var i=0;i<list.length;i++)
                  	{
                  		callback(list[i],i);
                  	}
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
                          html='<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                     }
                     else if(type==='exp')
                     {
                          element=DOMstrings.expensesContainer;
                          html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                     }

                     //replace the placeholder text with some actual data

                     newHtml=html.replace('%id%',obj.id);
                     newHtml=newHtml.replace('%description%',obj.description);
                     newHtml=newHtml.replace('%value%',formatNumber(obj.value,type));
                    
                    
                     //insert the html into dom (using insertAdjacentHTML)

                     document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
	               },
	               deleteItemList:function(selectorID)
	               {
                      var el=document.getElementById(selectorID);
                      el.parentNode.removeChild(el);
	               },
	               clearFields:function()
	               {
                      var fields,fieldsArr;
                      fields=document.querySelectorAll(DOMstrings.inputDescription +','+DOMstrings.inputValue);
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
	               displayBudget:function(obj)
	               {
	               	    var type;
	               	    obj.budget>=0?type='inc':type='exp';
                       document.querySelector(DOMstrings.budgetLabel).textContent=formatNumber(obj.budget,type);
                       document.querySelector(DOMstrings.incomeLabel).textContent=formatNumber(obj.totalInc,'inc');
                       document.querySelector(DOMstrings.expensesLabel).textContent=formatNumber(obj.totalExp,'exp');
                       if(obj.percentage>0)
                       {
                         	document.querySelector(DOMstrings.percentageLabel).textContent=obj.percentage+'%';
                       }
                       else
                       {
                            document.querySelector(DOMstrings.percentageLabel).textContent='---';
                       }
	               },
                    displayPercentages:function(percentages)
                    {
                        var fields=document.querySelectorAll(DOMstrings.expensesPercLabel);//this contain node lists
                        //nodelists doesnt allow foreach method therefore we have to use slice to convert the nodelists 
                        //into array
                        var nodeListForEach=function(list,callback)
                        {
                        	for(var i=0;i<list.length;i++)
                        	{
                        		callback(list[i],i);
                        	}
                        };
                        nodeListForEach(fields,function(current,index)
                        	{
                                 if(percentages[index]>0)
                                 {
                                 	current.textContent=percentages[index]+'%';
                                 }
                                 else
                                 {
                                 	current.textContent='---';
                                 }
                        	});
                    },
                    displayMonth:function()
                    {
                       var now,year,month,months;
                       now=new Date();
                       year=now.getFullYear();
                       month=now.getMonth(); 
                       months=['january ','feb ','march ','april ','may ','june ','july ','august ','september ','oct ','nov ','dec '];
                       document.querySelector(DOMstrings.dateLabel).textContent=months[month]+''+year;  
                    },
                    changedType:function()
                    {
                       var fields=document.querySelectorAll(DOMstrings.inputType+','+DOMstrings.inputDescription+','+DOMstrings.inputValue);
                       nodeListForEach(fields,function(curr)
                       	{
                           curr.classList.toggle('red-focus');
                       	});
                       document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
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
	         document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);	
	         document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);
        };
        var updateBudget=function()
        {
                //1.calculate the budget
                budgetCtrl.calculateBudget();
                //2. return the budget
                var budget=budgetCtrl.getBudget();
        		//3.need to display the budget on UI
        		UICtrl.displayBudget(budget);
        };
        var updatePercentages=function()
        {
            //1.calculate percentages
             budgetCtrl.calculatePercentages();
            //2.read percentages from the budget controller
             var percentages=budgetCtrl.getPercentages();
            //3.update the ui with new percentages
             UICtrl.displayPercentages(percentages);
        }; 

        var ctrlAddItem=function()
        {
	        	var input,newItem;
	        	//1.get the field input data
	        	input=UICtrl.getInput();
	        	if(input.description!=="" && !isNaN(input.value) && input.value>0)
	        	{
	        	    //2.add the item to budget controller
	        		newItem=budgetCtrl.addItem(input.type,input.description,input.value);
	        		//3.add the new item to user interface
	        		UICtrl.addItemList(newItem,input.type);
	        		//3* clear the input fields
	        		UICtrl.clearFields();
	        		//4.calculate and update budget
	                updateBudget();
	                //5.calculate and update the percentages
	                updatePercentages();
	        	}
        		
        		
        };
        var ctrlDeleteItem=function(event)
        {
        	var itemID,splitID,type,ID;
            itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
            if(itemID)
            {
               splitID=itemID.split('-');
               type=splitID[0];
               ID=parseInt(splitID[1]);
            }

            //1.delete the item from the data structure
            budgetCtrl.deleteItem(type,ID);
            //2.remove it from ui
            UICtrl.deleteItemList(itemID);
            //3.update the budget
            updateBudget();
        };
          var init=function()
          {
          	console.log('app has started');
          	setupEventListeners();
          	UICtrl.displayMonth();
          	UICtrl.displayBudget({
               	  budget:0,
                  totalInc:0,
                  totalExp:0,
                  percentage:-1
               });
          };
        // return
        // {
        // 	init: function()                      //why this is showing error
        // 	{
        // 		console.log('app has started');
        //        // setupEventListeners();
        // 	}
        // };
        return init;	
    })(budgetController,UIController);
    controller();
	