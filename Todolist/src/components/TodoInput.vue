<template>
    <div class='inputBox shadow'>
        <input type="text" v-model= "newTodoItem" v-on:keyup.enter= "addTodo"> 
        <!-- keyup의 경우에는 엔터를 칠때 입력값이 들어감 -->
        <!-- v-model은 input 내용을 밑의 인스턴스에 넣어서 맵핑함. 
        동적으로 같이 움직이는 것을 보여줌 입력한 내용이 결과값처럼 나오게 동적으로 움직이게 만들어줌
        크롬 개발자도구에서 확인해보면 웹페이지에서의 내용변경이 뷰 인스턴스에서의 내용변경이 같이 동기화됨 
        Two Way Bining 이라고 불림-->
        <span class="addContainer">
          <i class="fas fa-plus" v-on:click= "addTodo"></i>
          <!---<img src=".src/assets/plus.png" alt="plus">-->
          <!-- 아이콘스타일을 fas fa-plus로 하고 밑의 addBtn설정으로 다듬어줌 아이콘스타일은 awesome icon으로 들어가서 확인-->
        </span>
          
        <!-- 모달은 경고창임, 모달 컴포넌트페이지에서 긁어옴, 만약 showModal 이 True 라면 보여주기 그러나 default로 false로 저장해놓음, common 파일의 modal.vue 확인-->
        <Modal v-if="showModal" @close="showModal = false">
          <h2 slot="header">
            경고!<i class="closeModalBtn fas fa-times" @click= "showModal = false"></i> <!--v-on:click-->
          </h2>
          <h4 slot="body"> 아무것도 입력하지 않으셨어요.<br/> 내용을 입력해주세여</h4>
          <h4 slot="footer">감사합니다^^</h4> 
          <!-- 위의 slot들 안에 내용을 집어넣으면 override가 되면서 재정의가 됨 뒤집어쓰기 되어서 내용이 화면에 출력 -->
        </Modal>

    </div>
</template>

<script>
import Modal from "./common/Modal.vue";
export default {
  data: function() {
    return {
      newTodoItem: "", //데이터 기초설정
      showModal: false
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        //newTodoItem이 빈공간이 아닌경우 하기 내용 실행
        this.$store.commit("addOneItem", this.newTodoItem); //store.js 의 mutations에 있는 addTodoItem을 동작
        //this.$emit("addTodoItem", this.newTodoItem); /// Event Bus  this.$emit('이벤트 이름',인자1, 인자2.....) 이벤트 이름은 자기가 알아서 설정
        ////App.vue 의 template 에서 맵핑됨 v-on:addTodoItem으로 거기있는 addOneItem연결
        this.clearInput(); // 초기화 로직을 쓸수 있음 this.메쏘드를 끌어와서 쓸 수 있음
      } else {
        this.showModal = !this.showModal;
        this.clearInput();
      }
    },
    clearInput() {
      this.newTodoItem = ""; //초기화 로직
    }
  },
  components: {
    Modal: Modal
  } // 모달이 현재의 컴포넌트의 하위 컴포넌트로 등록된것임
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478f8, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>
