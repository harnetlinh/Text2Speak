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

        <div class="col-lg-9 col-sm">
          <div class="card center-div" id="maker" ref="maker" >
            <center>
              <h4 id="title">Type your text here</h4>
            </center>

            <b-row class="my-0">
              <b-col sm="4">
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
                  style="border:1px solid black;" 
                  highlight-style="background-color:yellow" 
                  :highlight-enabled="highlightEnabled" 
                  :highlight="highlight" 
                  v-model="msg"
                />
              </b-col>
            </b-row>
            
            <div class="row justify-content-md-center fixed-bottom">
              <div class="col-md-auto" id="btn-submit">
                <b-button @click="sendMsg()">Submit</b-button>
                <b-button @click="merge()"> TEST MEGR</b-button>
              </div>
            </div>

          </div>
        </div>

        <div class="col-lg-3 col-sm">
          <div class="card center-div overflow-auto" style="" >
              <b-col sm="15">
                <ul style="list-style-type:none;">
                  <li>
                    <choiceSub></choiceSub>
                  </li>
                  <li v-for="(i,index) in 10" :key="index">
                    <component :is="choiceSSML"></component>
                  </li>
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
            </div>+
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
import choiceSub from './choices/choiceSub'
import Crunker from 'crunker'
import axios from 'axios';
import HighlightableInput from "vue-highlightable-input"
import Aplayer from 'vue-aplayer'
import compo from './elements/button'
import speak from './elements/speak'
const audio = new Crunker();
const nullAudio = new Audio();
export default {
    name: 'QnAMaker',
    components : {
      HighlightableInput,
      Aplayer,
      'speak':speak,
      choiceSub
    },
    data() {
      return {
        valueSearch:"",
        box: false,
        textSend: '',
        voicerecord:nullAudio,
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
        test:'',
      highlightEnabled: true,
      choiceSSML:choiceSub
      }
    },
    mounted() {
    window.addEventListener('mouseup', this.testlighter);
    this.test = compo;
  },
    methods:{
      getSelectedText() {
        let t = (document.all) ? document.selection.createRange().text : document.getSelection();
        console.log("getSelectedText")
        return t;
      },
      testlighter(){
        console.log("testlighter")
        var selection = this.getSelectedText();
        var selection_text = selection.toString();
        console.log(selection_text)
        // How do I add a span around the selected text?
        
        var span = document.createElement('button');
        span.textContent = selection_text;
        
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
      },
      changeToHTML(value){
        console.log("OnClicked")
        console.log(value)
        if(value == true)
        {
          this.test = 'speak';
        }
        console.log(this.$refs.demogetHTML)
      },
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
    },
    merge(){
      audio
          .fetchAudio("http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3", "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3")
          .then(buffers => {
            // => [AudioBuffer, AudioBuffer]
            audio.mergeAudio(buffers);
          })
          .then(merged => {
            // => AudioBuffer
            audio.export(merged, "audio/mp3");
          })
          .then(output => {
            // => {blob, element, url}
            audio.download(output.blob);
            document.append(output.element);
            console.log(output.url);
          })
          .catch(error => {
            // => Error Message
          });
    }
    }
}
</script>

<style>

</style>

<style scoped src="../assets/css/QnAMaker.css">
span {color: green;}
</style>