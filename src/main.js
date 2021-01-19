const Vue = window.Vue;
Vue.config.productionTip = false;

// let id = 0;
// const createUser = (name, gender) => {
//   id += 1;
//   return { id: id, name: name, gender: gender };
// };
// new Vue({
//   data() {
//     return {
//       users: [
//         createUser("sum", "女"),
//         createUser("frank", "男"),
//         createUser("方方", "男"),
//         createUser("心心", "女"),
//       ],
//       displayUsers: [],
//     };
//   },
//   // created() {
//   //   this.displayUsers = this.users;
//   // },
//   methods: {
//     showAll() {
//       this.displayUsers = this.users;
//     },
//     showMale() {
//       this.displayUsers = this.users.filter((u) => u.gender === "男");
//     },
//     showFemale() {
//       this.displayUsers = this.users.filter((u) => u.gender === "女");
//     },
//   },
//   template: `
//     <div>
//       <button @click='showAll'>全部</button>
//       <button @click='showMale'>男</button>
//       <button @click='showFemale'>女</button>
//       <ul>
//         <li v-for="(u,index) in displayUsers" :key="index">
//           {{u.name}}-{{u.gender}}

//         </li>
//       </ul>
//     </div>
//   `,
// }).$mount("#app");

import w from "./watch.vue";
let id = 0;
const createUser = (name, gender) => {
  id += 1;
  return { id: id, name: name, gender: gender };
};
new Vue({
  components: {
    w,
  },
  data() {
    return {
      users: [
        createUser("sum", "女"),
        createUser("frank", "男"),
        createUser("方方", "男"),
        createUser("心心", "女"),
      ],
      gender: "",
    };
  },
  computed: {
    displayUsers() {
      const { users, gender } = this;
      // const users = this.users
      // const gender = this.gender
      const hash = {
        male: "男",
        female: "女",
      };
      if (gender === "") {
        return users;
      } else if (typeof gender === "string") {
        return users.filter((u) => u.gender === hash[gender]);
      } else {
        throw new Error("gender 的值是意外值");
      }
    },
  },

  methods: {
    setGender(string) {
      this.gender = string;
    },
  },
  template: `
    <div>
      <button @click='setGender("")'>全部</button>
      <button @click='setGender("male")'>男</button>
      <button @click='setGender("female")'>女</button>
      <ul>
        <li v-for="(u,index) in displayUsers" :key="index">
          {{u.name}}-{{u.gender}}

        </li>
      </ul>
      
       
       <w/>
    </div>
  `,
}).$mount("#app");
