<template>
<div>
  <div
    id="sel"
    ref="dynamicDiv"
    contenteditable="true"
    style="border:1px solid black;width: 100%;height: 100%;" 
    @contextmenu.prevent="$refs.menu.open($event, {})"
    >
    
  </div>
  <vue-context ref="menu">
        <template slot-scope="child" v-if="child.data">
            <li>
                <a @click="red(child.data)">
                    RED
                </a>
            </li>
            <li>
                <a @click.prevent="remove(child.data.index)">
                    Delete "{{ child.data.name }}"
                </a>
            </li>
        </template>
    </vue-context>
</div>
</template>

<script>
const constructor = {
    id : 0,
    p : {
      isActive : 0,
      tag : "emphasis",
      attributes : [],
    },
    paragraph : {
      isActive : 0,
      tag : "paragraph",
      attributes : [],
    },   
    say_as : {
      isActive = 0,
      tag : "say-as",
      attributes : {
        interpret_as : {
          isActive : 0,
          text : "interpret-as",
          value: "",
          options: ["date","time","literal","telephone","currency","cardinal","ordinal","digits"]
        },
        format : {
          isActive : 0,
          text : "format",
          value: "",
          options: []
        },
      },
    },
    emphasis : {
      isActive = 0,
      tag : "emphasis",
      attributes : {
        level: {
          isActive : 0,
          text: "level",
          value: "",
          options: ["strong","moderate","none","reduced"]
        }
      }
    },
    prosody :  {
      isActive = 0,
      tag : "emphasis",
      attributes : {
        pitch : {
          isActive : 0,
          text: "pitch",
          value: "",
          options: ["x-high","high","medium","low","x-low","default"]
        },
        contour : {
          isActive : 0,
          text: "pitch",
          value: "",
          options: ["x-high","high","medium","low","x-low","default"]
        }
      }
      
      contour : null;
      this.ranger = null;
      this.rate = null;
      this.duration = null;
      this.volume = null;
  };
    this.break = new break_();
    this.audio = new audio_();
    this.desc = null;
    this.mark = new mark();
}
class prosody{
  constructor(){
      this.pitch = null;
      this.contour = null;
      this.ranger = null;
      this.rate = null;
      this.duration = null;
      this.volume = null;
  }
}
class break_ {
  constructor(){
    this.strength = null;
    this.time = null;
  }
}
class say_as{
  constructor(){
    this.interpret_as = null;
    this.format = null;
    this.detail = null;
  }
}
class audio_{
  constructor(){
    this.src = null;
  }
}
class mark{
  constructor(){
    this.name =  null;
  }
}
class emphasis{
  constructor(){
    this.isActive = false;
    this.tag = "emphasis";
    this.attributes = [
      {}
    ];
  }
}
class emphasis_attributes{
  constructor(){
    this.a
  }
};
class ClassSSML {
  constructor(id) {
    this.id = id;
    this.p = null;
    this.paragraph = null;//   
    this.say_as = new say_as();
    this.emphasis = new emphasis();
    this.prosody =  new prosody();
    this.break = new break_();
    this.audio = new audio_();
    this.desc = null;
    this.mark = new mark();
  }
}
import VueContext from 'vue-context';
import 'vue-context/src/sass/vue-context.scss';
export default {
    data(){
        return{
        numID:1,
        viewMenu: false,
        top: '0px',
        left: '0px',
        listSSML:[],
        }
    },
    components: {
            VueContext 
    },
    methods:{
        red(data){
      var _this = this;    
          var selection = window.getSelection().getRangeAt(0);
          // console.log(window.getSelection())
          console.log("select "+ window.getSelection().anchorNode.parentNode.nodeName)
          if(window.getSelection().anchorNode.parentNode.nodeName === "SPEAK")
          {console.log("SPEAK");
          // console.log(window.getSelection().anchorNode.parentNode.nodeName = "")
          }else{
            if(window.getSelection().baseNode.parentNode.id != "sel") return;
            var selectedText = selection.extractContents();
            var span = document.createElement("speak");
            span.setAttribute("id",this.numID)
            this.numID++;
            let x = new ClassSSML(this.numID)
            this.listSSML.push(x)
            span.onclick = function(){
              _this.getlistSSML(this.id)
            }
            span.style.color = "red";
            span.appendChild(selectedText);
            selection.insertNode(span);
          }
      },
      getlistSSML(id){
        console.log(id)
        this.listSSML[0].say_as.interpret_as = 4
        console.log(this.listSSML[0].say_as.interpret_as)
      },
    }
}
</script>

<style>
body {
    width: 100%;
    height: 100%;
}

h1 {
  font-size: 3em;
}

.center {
  text-align: center;
}

#demo {
    width: 100%;
    height: 100%;
}

#right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
}
</style>