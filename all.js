let ToDoList=[
    // {
    //     coontent:"",
    //     checked:false
    // }
];

const list =document.querySelector(".list");
const input =document.querySelector(".input");
const txtAddTodo=document.querySelector(".txtAddTodo");
const tab=document.querySelector(".tab");
const unFinishedNum=document.querySelector(".list_footer span")

/* <li>
    <label class="checkbox" for="">
    <input type="checkbox" />
    <span>把冰箱發霉的檸檬拿去丟</span>
    </label>
    <a href="#" class="delete"></a>
</li> */

// 初始化
function render(ary){
    let str="";
    let count=0;
    if(toggleTab=="all"){
        ary.forEach(function(item,index){
            if(item.checked){
                str += `
                <li data-num="${index}">
                <label class="checkbox" for="">
                <input type="checkbox" checked/>
                <span>${item.content}</span></label>
                <a href="#" class="delete"></a></li>`
            }else{
                count+=1;
                str += `
                <li data-num="${index}">
                <label class="checkbox" for="">
                <input type="checkbox" />
                <span>${item.content}</span></label>
                <a href="#" class="delete"></a></li>`;
            };
        });
    }else if(toggleTab=="unfinished"){
        ary.forEach(function(item,index){
            if(item.checked){
                return;
            }else{
                count+=1;
                str += `
                <li data-num="${index}">
                <label class="checkbox" for="">
                <input type="checkbox" />
                <span>${item.content}</span></label>
                <a href="#" class="delete"></a></li>`;
            };
        });
    }else{
        ary.forEach(function(item,index){
            if(item.checked){
                str += `
                <li data-num="${index}">
                <label class="checkbox" for="">
                <input type="checkbox" checked/>
                <span>${item.content}</span></label>
                <a href="#" class="delete"></a></li>`
            }else{
                count+=1;
                return;
            };
        });
    }
    if(str!==""){
        list.innerHTML=str;
    }else{
        list.innerHTML=`<p class="list_p">找點事做吧！</p>`;
    }
    unFinishedNum.textContent=count;
};

//新增項目
input.addEventListener("click",function(e){
    e.preventDefault();
    if (e.target.getAttribute("class")=="btn_add"&&txtAddTodo.value.trim()!==""){
        let obj={};
        obj.content=txtAddTodo.value;
        obj.checked=false;
        ToDoList.push(obj);
        txtAddTodo.value="";
        render(ToDoList);
    }
});


list.addEventListener("click",function(e){
    e.preventDefault();
    // 刪除項目
    let num=e.target.closest("li").getAttribute("data-num"); 
    // closest取父層
    if(e.target.getAttribute("class")=="delete"&&e.target.nodeName == "A"){
        ToDoList.splice(num,1);
    }else{
        //切換待辦事項的狀態
        ToDoList[num].checked = !ToDoList[num].checked ;
        // console.log(ToDoList[num].checked);
    }
    render(ToDoList);    
});



// 刪除所有完成的項目
const clearBtn=document.querySelector(".clear_btn");
clearBtn.addEventListener("click",function(e){
    e.preventDefault;
    let newList=ToDoList.filter((item)=>item.checked==false)
    // console.log(newList);
    ToDoList=newList;
    render(ToDoList);
})



// 待辦清單列表會有『全部』、『完成』、『未完成』Tab 來做篩選切換
{/* <ul class="tab">
        <li data-tab="all" class="active">全部</li>
        <li data-tab="unfinished">待完成</li>
        <li data-tab="finished">已完成</li>
</ul> */}

const ulTab=document.querySelector(".tab");
let toggleTab="all";
ulTab.addEventListener("click",function(e){
    e.preventDefault;
    // console.log(e.target);
    
    let remove=document.querySelectorAll(".tab li");
    remove.forEach(item=>{
        item.setAttribute("class","");
    })
    e.target.classList.add("active");

    toggleTab=e.target.getAttribute("data-tab");
    render(ToDoList);
})



