<template>
  <div id="qna">
    <div class="container-fluid dashboard">
      <div class="row">

          <div class="col-lg-5 col-sm">
              <div class="card" id="search">
                <center>
                  <h4 id="title">Search text</h4>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col class="col-8"><b-form-input v-model="valueSearch" v-on:change="onChangedSearch()" type="text" debounce="500" placeholder="Search Text" id="keyword-input"></b-form-input></b-col>
                      <b-col class="col-4"><b-button v-on:click="onChangedSearch(valueSearch)">Regex</b-button></b-col>
                    </b-row>
                  </b-container>
                </center>
              </div>
          </div>
          
          <div class="col-lg col-sm">
              <div class="card" id="qoutes">
                  <div class="card-body">
                      <div class="media align-items-center">
                          <div class="media-body">
                            <aplayer autoplay
                              :music="{
                                title: isReady?'READY TO HEAR':'NOT AVAILABLE',
                                artist: 'FPT AI',
                                src: voicerecord,
                                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
                                theme:isReady?'rgb(65, 184, 131)':'tomato'
                              }"
                            />
                              <!-- <span>"Wisdom is not a product from school, but a lifelong learning process." <br> "Trí tuệ không phải là một sản phẩm từ trường học, mà là một quá trình học tập suốt đời."</span> -->
                          </div>
                          <div class="text-center" style="margin-left:20px">
                              <b-button size="h1" class="mb-2" :variant="isReady?'success':'secondary'" v-on:click="$router.push(voicerecord)">
                                <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
                              </b-button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

      <div class="row">

        <div class="col-lg-10 col-sm">
          <div class="card" id="maker" ref="maker" >
            <center>
              <h4 id="title">Type your text here</h4>
            </center>

            <b-row class="my-0">
              <b-col sm="2">
                <label for="textarea-auto-height">Turn on highlight Text</label>
              </b-col>
              <b-col sm="1">
                <b-form-checkbox v-model="highlightEnabled" name="check-button" switch>
                </b-form-checkbox>
              </b-col>
              <b-col sm="12">
                <highlightable-input
                  id="sel"
                  @mouseup="highlighter()"
                  style="border:1px solid black; min-height:30vh" 
                  highlight-style="background-color:yellow" 
                  :highlight-enabled="highlightEnabled" 
                  :highlight="highlight" 
                  v-model="msg"
                />
              </b-col>
            </b-row>
            
            <div class="row justify-content-md-center">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="sendMsg()">Submit</b-button>
              </div>
            </div>

          </div>
        </div>

        <div class="col-lg-2 col-sm">
          <div class="card" >
              <b-col sm="15">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </b-col>
          </div>
        </div>
      </div>

      <div class="messages">
        <div id="box-mess" v-show="box">
          <div id="title-box">Chatbot</div>
          <div id="show-mess">

            <div class="bot-send">
              <div class="row">
                <div class="col-3 ava">
                  <img src="../assets/bot.png" alt="Avatar">
                </div>
                <div class="col-8 text">
                  <p>Hello. How can I help you?</p>
                </div>
              </div>
            </div>
          </div>
          <div id="send" class="row">
              <b-form-input  id="textSend" class="col-10"></b-form-input>
              <b-button class="col-2"><i class="icofont-location-arrow"></i></b-button>
          </div>
        </div>
        <b-button id="openMessages" @click="box = !box"><i class="icofont-facebook-messenger"></i></b-button>
      </div>
      
    </div>
    <b-modal id="modal-spinner" title="BootstrapVue" hide-footer hide-header no-close-on-backdrop no-close-on-esc >
      <div>
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import HighlightableInput from "vue-highlightable-input"
import Aplayer from 'vue-aplayer'
export default {
    name: 'QnAMaker',
    components : {
      HighlightableInput,
      Aplayer
    },
    data() {
      return {
        valueSearch:"",
        box: false,
        textSend: '',
        voicerecord:"",
        msg: '',
        isReady:false,
        highlight: [
          {text:'chicken', style:"background-color:#f37373"},
          {text:'noodle', style:"background-color:#fca88f"},
          {text:'soup', style:"background-color:#bbe4cb"},
          {text:'so', style:"background-color:#fff05e"},
          // "whatever",
          // {start: 2, end: 5, style:"background-color:#f330ff"}
        ],
      highlightEnabled: true
      }
    },
    mounted() {
    window.addEventListener('mouseup', this.highlighter);
  },
    methods:{
      onChangedSearch(value)
      {
        console.log( "HERRRREEE " + value)
        let randomColor = 'background-color:#'+(Math.random()*0xFFFFFF<<0).toString(16);
        this.highlight.push({text:value, style:randomColor})
      },
      sendMsg(){
        this.$bvModal.show('modal-spinner')
        axios.post(`http://c39a6c482a7a.ngrok.io/getOnlyMp3`,{
            text:this.msg
            
        })
        .then(response => {
          this.voicerecord = response.data.mp3
          this.isReady = true
          this.$bvModal.hide('modal-spinner')
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      getSelectionText() {
          document.getElementById("sel").textContent
          let text = window.getSelection().toString();
        return text;
    },
    highlighter() {
      let text = this.getSelectionText();
      if(text != 0 && text != "")
      {
        this.onChangedSearch(text)
      }
    }
    }
}
</script>

<style>

</style>

<style scoped src="../assets/css/QnAMaker.css"></style>