<template>
    <div>
      <transition-group name="list" tag="ul"> <!--트렌지션 효과 태그를 접목시키기-->
            <li class="checkBtn shadow" v-for= "(todo,index) in this.storedtodoItems " v-bind:key= "todo.item"><!-- 화면에 출력하기위해서 v-bind해주기 -->
                <!--{method:True/False}-->
                
                <i class="checkBtn fas fa-check" v-bind:class= "{checkBtnCompleted: todo.completed}"
                v-on:click= "toggleComplete({todo, index})"></i> <!--체크버튼 활성화: todoItem의 completed 속성이 true 인경우 checkBtnCompleted의 클래스가 활성화 됨-->
                
                <span v-bind:class= "{textCompleted: todo.completed}">{{todo.item}}</span><!--로컬 스토리지 객체에 item 속성에 접근하여 프린트-->
                <!-- 클래스를 묶어줌. textCompleted ==false로 속성은 todoItem에 있는 completed 의 boolean값이므로 처음에는 false로 초기값이 되어있음 -->
                
                <span class="removeBtn" v-on:click= "removeTodo({todo, index})"><!-- 키값과 인덱스를 같이 보길 원하는 경우 파라미터 지정해주기-->
                   <!-- 삭제를 원할경우 index를 찾아서 선택적으로 삭제하는 메서드를 만든다 키와 인덱스를 removeTodo 메서드의 파라미터로 준다-->
                <i class="fas fa-trash-alt"></i>
                </span>
            
            </li>
      </transition-group>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  // props: ["propsdata"], //store.js에서 todoItems를 바로 사용하므로 props가 더이상 필요없음
  methods: {
    ...mapMutations({
      removeTodo: "removeOneItem",
      toggleComplete: "toggleOneItem" // 앞 속성은 템플릿에 나와있는 메소드: 뒷속성은 store.js의 Mutations 속성을 연결
    })
    // removeTodo(todo, index) {
    //   // 파라미터를 v-on:click의 파라미터와 똑같아야함
    //   if (this.$store.state.todoItems.length > 0) {
    //     this.$store.commit("removeOneItem", { todo, index }); /// store.js의 mutations에 등록된 펑션 store.commit()으로 가져오기 '이벤트이름설정', payload{인자1, 인자2}
    //   }
    // },
    // toggleComplete(todo, index) {
    //   this.$store.commit("toggleOneItem", { todo, index });
    // }
  },
  computed: {
    // todoItems() {
    //   return this.$store.getters.storedtodoItems;
    // }
    ...mapGetters(["storedtodoItems"]) // store.js의 getters에서 선언된 펑션을 helper함수 이용하여 store.js에서 선언된 펑션 그대로 가지고옴
  }
  ///addTodo 기능으로 로컬스토리지에 저장되고 내용들을 꺼내오고 todoItems에 push 되어 화면에 집어넣음
};
</script>

<style scoped>
/*강사님이 원래 가지고 있던 스니펫 사용*/
ul {
  list-style-type: none; /*점 없애기*/
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50;
  margin: 0.5rem 0; /*마진은 구역 바깥쪽 패딩은 구역안쪽*/
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
/*리스트라는 클라스를 가지는 ul태그에서 트랜지션 효과를 하기와 같이 줌*/
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0; /*투명성*/
  transform: translateY(30px);
}
</style>
