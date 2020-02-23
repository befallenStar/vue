<template>
  <div id="home">
    <div class="head">
      <el-drawer
        title="题目列表"
        :visible.sync="drawer"
        :direction="direction"
        size="40%"
        :with-header="false"
      >
        <div class="q-list-main">
          <span v-for="(i,index) in 10" :key="index">
            <span v-for="(j,index) in 10" :key="index">
              <el-button class="q-button" @click="shift" :value="(i-1)*10+j">{{(i-1)*10+j}}</el-button>
            </span>
          </span>
        </div>
      </el-drawer>
      <div class="q-generator">
        <el-select v-model="subject" placeholder="请选择" @change="generated=false">
          <el-option
            v-for="(item,index) in subjects"
            :key="index"
            :label="item.name"
            :value="item.index"
          ></el-option>
        </el-select>
        <el-select v-model="model" placeholder="请选择" v-if="subject=='1'" @change="generated=false">
          <el-option
            v-for="(item,index) in models"
            :key="index"
            :label="item.name"
            :value="item.index"
          ></el-option>
        </el-select>
        <el-button @click="generate()">生成</el-button>
        <el-button @click="drawer = true" type="primary" plain v-if="generated">题目列表</el-button>
      </div>
    </div>
    <div class="main" v-if="generated">
      <div class="question">
        <span class="question-id">{{current.id}}.&emsp;</span>
        <span class="question-text">{{current.question}}</span>
        <div class="q-img" v-if="current.url">
          <el-image :src="current.url"></el-image>
        </div>
      </div>
      <div class="choices" v-if="current.answer in [1,2,3,4,'1','2','3','4']">
        <div class="choice" v-for="(item,index) in current.choices" :key="index">
          <el-radio v-model="result.choice" :label="index+1">{{item}}</el-radio>
        </div>
      </div>
      <div class="choices" v-else>
        <div class="choice" v-for="(item,index) in current.choices" :key="index">
          <el-checkbox v-model="result.choices" :label="Math.power(2,index)">{{item}}</el-checkbox>
        </div>
      </div>
      <div class="explains" v-if="result.confirmed">
        <div class="explains-title">
          <span>解析：{{answers[current.answer-1].toString()}}</span>
          &emsp;&emsp;&emsp;&emsp;
          <span
            :class="[result.correct?greenanswer:redanswer]"
          >我的答案：{{answers[result.choiceSum].toString()}}</span>
        </div>
        <span class="explains-content" :html="current.explains">{{current.explains}}</span>
      </div>
      <div class="buttons">
        <el-button @click="confirm()">确定</el-button>
        <el-button @click="goback()">上一题</el-button>
        <el-button @click="forward()">下一题</el-button>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // appkey: "333241f830d23afe273ccfc07bb917b8",
      appkey: "549bf5ca215a8bd27d9f53bb16490710",
      subject: "",
      subjects: [
        { index: "1", name: "科目一" },
        { index: "4", name: "科目四" }
      ],
      model: "",
      models: [
        { index: "c1", name: "c1" },
        { index: "c2", name: "c2" },
        { index: "a1", name: "a1" },
        { index: "a2", name: "a2" },
        { index: "b1", name: "b1" },
        { index: "b2", name: "b2" }
      ],
      testType: "rand",
      list: [],
      answers: [
        ["A"],
        ["B"],
        ["C"],
        ["D"],
        "正确",
        "错误",
        ["A", "B"],
        ["A", "C"],
        ["A", "D"],
        ["B", "C"],
        ["B", "D"],
        ["C", "D"],
        ["A", "B", "C"],
        ["A", "B", "D"],
        ["A", "C", "D"],
        ["B", "C", "D"],
        ["A", "B", "C", "D"]
      ],
      current: {},
      result: {
        choice: "",
        choices: [],
        choiceSum: "",
        correct: true,
        confirmed: false
      },
      q_id: "0",
      done: new Map(),
      redanswer: "red-answer",
      greenanswer: "green-answer",
      generated: false,
      drawer: false,
      direction: "rtl"
    };
  },

  methods: {
    popalert(message) {
      this.$alert(message, "", {
        confirmButtonText: "确定",
        center: "true"
      });
    },
    generate() {
      if ("1" == this.subject)
        if (this.model) {
          this.loaddata();
          this.generated = true;
        } else this.popalert("请选择题目类型");
      else if ("4" == this.subject) {
        this.loaddata();
        this.generated = true;
      } else this.popalert("请选择题目类型");
    },
    loaddata() {
      let self = this;
      let params = {
        key: this.appkey,
        subject: this.subject,
        model: this.model,
        testType: this.testType
      };
      this.axios
        .get("jztk/query", {
          params: params
        })
        .then(res => {
          self.list = res.data.result;
          self.refresh();
          self.generated = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    save() {
      if (!this.done.has(this.q_id))
        if (this.result.choice || true == this.result.choices) {
          this.done.set(this.q_id, this.result);
        }
    },
    confirm() {
      if (this.result.confirmed) {
        this.popalert("已经提交过这道题了！");
      } else {
        if (this.result.choice) {
          this.result.choiceSum = this.result.choice - 1;
        } else if (true == this.result.choices) {
          let sum = 0;
          this.result.choices.forEach(element => {
            sum += parseInt(element);
          });
          this.result.choiceSum = sum;
          switch (this.result.choiceSum) {
            case 3:
              this.result.choiceSum = 6;
              break;
            case 5:
              this.result.choiceSum = 7;
              break;
            case 6:
              this.result.choiceSum = 9;
              break;
            case 7:
              this.result.choiceSum = 12;
              break;
            case 9:
              this.result.choiceSum = 8;
              break;
            case 10:
              this.result.choiceSum = 10;
              break;
            case 11:
              this.result.choiceSum = 13;
              break;
            case 12:
              this.result.choiceSum = 11;
              break;
            case 13:
              this.result.choiceSum = 14;
              break;
            case 14:
              this.result.choiceSum = 15;
              break;
            case 15:
              this.result.choiceSum = 16;
              break;
          }
        } else {
          this.popalert("选项为空！");
          return;
        }
        if (this.result.choiceSum == this.current.answer - 1)
          this.result.correct = true;
        else this.result.correct = false;
        this.result.confirmed = true;
        this.save();
      }
    },

    goback() {
      if (this.q_id > 0) {
        this.save();
        this.q_id--;
        this.refresh();
      } else {
      }
    },
    forward() {
      if (this.q_id < 99) {
        this.save();
        this.q_id++;
        this.refresh();
      } else {
      }
    },

    refresh() {
      if (this.done.has(this.q_id)) {
        this.result = this.done.get(this.q_id);
      } else {
        this.result = {
          choice: "",
          choices: [],
          correct: true,
          confirmed: false
        };
      }
      this.current = this.list[this.q_id];
      this.current.choices = new Set();
      if (this.current.item1) this.current.choices.add(this.current.item1);
      else this.current.choices.add("正确");
      if (this.current.item2) this.current.choices.add(this.current.item2);
      else this.current.choices.add("错误");
      if (this.current.item3) this.current.choices.add(this.current.item3);
      if (this.current.item4) this.current.choices.add(this.current.item4);
    },
    shift(event) {
      this.drawer = false;
      this.save();
      this.q_id = event.target.value - 1;
      this.refresh();
    }
  }
};
</script>
<style>
body,
div {
  margin: 0px;
  padding: 0px;
  text-align: left;
  font-size: 16px;
}
.q-list-main {
  margin-top: 20px;
}
.q-list-main span span button {
  margin-top: 10px;
}
.q-generator,
.q-generator > * {
  margin-top: 30px;
  margin-left: 20px;
}
.q-generator > * {
  margin-top: 0px;
}
.q-button {
  width: 50px;
  margin-left: 10px;
  text-align: center;
}
.main {
  margin-left: 40px;
  margin-top: 20px;
}
.main .question {
  margin-top: 20px;
}
.main .question .q-img {
  margin-top: 20px;
}
.main .choices {
  margin-top: 20px;
}
.main .choices .choice {
  margin-top: 20px;
}
.main .explains {
  margin-top: 20px;
}
.main .explains .explains-title {
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
}
.main .explains explains-content {
  margin-top: 20px;
}
.main .buttons {
  margin-top: 20px;
}
.red-answer {
  color: red;
}
.green-answer {
  color: green;
}
</style>