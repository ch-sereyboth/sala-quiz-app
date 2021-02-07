<template>
  <div class="results">
      <amplify-sign-out></amplify-sign-out>
    <div class="createResult">
      <input v-model="name" name="name" />
      <input v-model="course" name="course" />
      <input v-model="quizroom" name="quizroom" /> 
      <input v-model="score" name="score" />  
      <button v-on:click="createResult()">Add Result</button>
    </div>
    <template v-for="(result,index) in results">
      <div key={{index}}>
        <h3>{{result.name}}</h3>
        <p>{{result.course}}</p>
        <p>{{result.quizroom}}</p>
        <p>{{result.score}}</p>
      </div>
    </template>
  </div>
  
</template>

<script>
import Vue from 'vue'
import { API, graphqlOperation} from "aws-amplify"
import { listResults } from "../graphql/queries"
import { createResult } from "../graphql/mutations"
import { onCreateResult } from "../graphql/subscriptions"

export default {
  name: 'Result',
  data () {
    return {
      results: [],
      name: "",
      course: "",
      quizroom: "",
      score: ""
    }
  },
  mounted: async function () {
    let results = await API.graphql(graphqlOperation(listResults))
    console.log(results)
    this.results = results.data.listResults.items

    API.graphql(
      graphqlOperation(onCreateResult)
    ).subscribe({
      next: (eventData) => {
        console.log('eventData: ', eventData);
        const result = eventData.value.data.onCreateResult;
        const results = [...this.results.filter(content => {
          return ((content.name !== result.name) && (content.course !== result.course) && (content.quizroom !== result.quizroom) && (content.score !== result.score));
        }), result];
        this.results = results;
      }
    });

  },
  methods: {
    createResult: async function () {
      if ((this.name === "") || (this.course === "") || (this.quizroom === "") || (this.score === "")) return 
      const result = {name: this.name, course: this.course, quizroom: this.quizroom, score: this.score}
      try {
        const results = [...this.results, result]
        this.results = results
        this.name = "";
        this.course = "";
        this.quizroom = "";
        this.score = "";
        await API.graphql(graphqlOperation(createResult, {input: result}))
        console.log('success')
      } catch (error) {
        console.log('error: ', error)
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>