new Vue({
  el: "#table",
  data() {
    return {
      // 编辑蒙层默认隐藏
      layer: false,
      // 原始数据
      items: [
        { id: 1, title: "a", user: "小明", date: "2020-02-12" },
        { id: 2, title: "b", user: "小华", date: "2020-02-13" },
        { id: 3, title: "c", user: "小红", date: "2020-02-14" }
      ],
      // add时的数据
      obj: {
        title: "",
        user: "",
        date: ""
      },
      // edit时的数据
      editItems: []
    };
  },
  methods: {
    add() {
      // 求id的最大值
      var maxId = Math.max(
        ...this.items.map(function(v) {
          return v.id;
        })
      );
      //满足该条件时才能添加
      if (this.obj.title && this.obj.user && this.obj.date) {
        // 向原始数据中添加数据
        this.items.push({
          id: maxId + 1,
          title: this.obj.title,
          user: this.obj.user,
          date: this.obj.date
        });
        // 将add的数据清空
        this.obj = {};
      }
    },
    del(index) {
      this.items.splice(index, 1);
    },
    edit(item) {
      this.editItems = {
        id: item.id,
        title: item.title,
        user: item.user,
        date: item.date
      };
      this.layer = true;
    },
    update() {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id == this.editItems.id) {
          this.items[i] = this.editItems;
        }
      }
      this.layer = false;
    }
  }
});
