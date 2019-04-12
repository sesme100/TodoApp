<template>
  <div id="app">
    <router-view/>  <!-- 이 라우터는 TodoHeader를 나타냄 라우터파일 확인해보기 -->
    <TodoInput/> <!--v-on:addTodoItem = "addOneItem"-->
    <!--v-on:하위 컴포넌트에서 $emit된 이벤트 이름 리스닝="현재 컴포넌트의 메서드 명" -->
    <TodoList/> <!--v-bind:propsdata= "todoItems" v-on:removeTodoItem= "removeOneItem" v-on:toggleOneComplete= "toggleOneItem"-->
    <!--v-bind:내려보낼 props 속성이름(propsdata todoList.vue에서 props 받는 이름)="현재 위치의 컴포넌트 데이터 속성(todoItems)"-->
    <!-- todoInput 에서 받은 정보가 로컬스토리지에 저장된 것을 app.vue에서 받아서 todoItems로 데이터를 저장하여 todoList로 쏴줌-->
    <TodoFooter/><!--v-on:clearAllItems= "removeAllItems"-->

  </div>
</template>

<script>
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

export default {
  name: "App",
  // data: function() {
  //   return {
  //     todoItems: []
  //   };
  // },
  // created: function() {
  //   if (localStorage.length > 0) {
  //     for (let i = 0; i < localStorage.length; i++) {
  //       // 반복문의 경우 값을 재할당 가능한 let을 사용, const는 값의 재할당이 안되어서 오류됨
  //       if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
  //         //loglevel:webpack-dev-server 은 자동주입되는 key 이며 프로토타입핑
  //         this.todoItems.push(
  //           JSON.parse(localStorage.getItem(localStorage.key(i))) // 자바스크립트 객체 내부의 item정보에 접근하기 위해 이렇게 사용
  //         );
  //         // JSON.parse(localStorage.getItem(localStorage.key(i)))를 콘솔에 입력하면 {completed: false, item: "brush up"}이 나오고 속성도 표시 completed: falseitem: "brush up"__proto__: Object
  //         //localstorage 는 개발자도구 application에서 로컬 스토리지에서 확인
  //         //JSON.parse의 경우 TodoInput.vue에서 입력되었던 JSON객체의 내용이 스트링이 되었으나 여기서 오브젝트 속성으로 바꿔줌
  //         // todoItems 는 크롬개발자 뷰에 들어가서 array 개수와 내용확인 가능, 화면상에는 나타나지 않음
  //         // JSON.parse 으로 객체의 정보 모두 뽑아낼 경우 template 가서 보여지는 내용 todo를 todo.item으로 바꿔야 내가 보고 싶은 내용만 볼수 있음
  //         /// 원래는 TodoList.vue 에 있던 created 라이프싸이클 훅을 여기로 가져와서 props로 내려줌
  //         /// created: vue 라이프사이클, 뷰인스턴스가 생성되자마자 호출되는 라이프사이클 훅. 인스턴스 생성되는 시점되자마자 호출됨
  //       }
  //     }
  //   }
  // },
  methods: {
    /// Event Bus 사용하는 메서드들 /// 위의 template 에서 맵핑하여 연결함
    // addOneItem(todoItem) {
    //   // todoItem은 블랭크에 내가 입력하는 값
    //   // $emit 된 이벤트의 인자 개수가  1개 이므로 1개의 이름설정하여 받아줌
    //   /// TodoInput.vue컴포넌트에서 addTodo의 메서드 내용 가져욤
    //   const obj = { completed: false, item: todoItem }; // const 설정하여 값의 재할당과 변수 재선언 안됨 // 로컬스토리지의 value값을 이렇게 obj로 설정해줌
    //   localStorage.setItem(todoItem, JSON.stringify(obj)); // strigify(param) 자바스크립트 객체를 스트링값으로 변환해줌
    //   // 로컬스토리지에 키, 벨류 값을 셋트로 넣어줌 벨류값이 JSON 형식파일이 됨
    //   // 이 App.vue는 데이터를 조작하는 중앙시스템 장치가 되고 다른 Input, List 컴포넌트들은 그냥 프리젠터가 됨
    //   //JSON 은 OBJECT를 넣어줄때 오브젝트로 표현 하는것이 아니라 스트링값으로 보여줘서 무엇이 들어갔는지 쉽게 확인 가능: 개발자도구-application-localStorage 확인
    //   //localStorage.setItem(this.newTodoItem, this.newTodoItem); 로컬스토리지의 키값이 this.newTodoItem이 되고, value 값이 this.newTodoItem이 됨
    //   //저장하는 로직이고 개발자도구-application-Storage-local Storage 에서 키값과 벨류값을 확인 가능함 (WDS)
    //   this.todoItems.push(obj);
    //   console.log(this.todoItems);
    // },
    // removeOneItem(todo, index) {
    //   localStorage.removeItem(todo.item); // 로컬상의 브라우저 스토리지에서 삭제되나 화면상에 나타나는 스크립트에서는 reload를 해야지만 삭제 업데이트된 내용을 볼수 있다
    //   // localStorage.removeItem('실제키값')하면 키와 밸류가 동시에 삭제됨
    //   this.todoItems.splice(index, 1); // 여기는 화면상에 출력되는 스크립트 영역(브라우저 저장소)으로 로컬스토리지와 분리하여 생각. 글구 둘 영역모두 item 삭제 해줘야함, 특정 인덱스에서 1개만 삭제
    // },
    // toggleOneItem(todo, index) {
    //   this.todoItems[index].completed = !this.todoItems[index].completed;
    //   // todo.completed = !todo.completed;
    //   localStorage.removeItem(todo.item); // JSON의 객체를 업데이트 하기 위해 삭제후 다시 셋팅 그러면 completed 의 속성이 업데이트 되는 내용을 바로 확인 가능
    //   localStorage.setItem(todo.item, JSON.stringify(todo));
    // },
    // removeAllItems() {
    //   localStorage.clear();
    //   this.todoItems = []; // 스토리지만 삭제하면 화면(스크립트 또는 브라우저 스토리지)에는 리프레쉬 할때까지 반영이 안됨, 화면의 데이터 배열도 같이 비워주기
    // }
  },
  components: {
    TodoInput: TodoInput /* template에 표시되는 태그명: import 되는 컴포넌트 파일*/,
    TodoList: TodoList /*이름이 같은 경우 속성명 축약가능 */,
    TodoFooter: TodoFooter /*컴포넌트 태그명: 컴포넌트 내용*/
  }
};
</script>

<style>
/*scoped 를 안해놔서 cascading 이 되어서 밑으로 다 유전되어 적용됨 하위 컴포넌트에서 shadow 클래스 쓸수 있음*/
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
