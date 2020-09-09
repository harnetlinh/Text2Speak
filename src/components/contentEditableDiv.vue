<template>
<div>
  <div
    id="sel"
    ref="dynamicDiv"
    contenteditable="true"
    style="border:1px solid black;width: 100%;height: 100%;" 
    @contextmenu.prevent="$refs.menu.open($event, {})"
    >
    {{}}
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
    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="1"
      unchecked-value="0"
    >
      Break
    </b-form-checkbox>
    <b-button @click="tagBreak()">SAVE</b-button>

</div>
</template>

<script>
import construct from './lib/contruct'
import VueContext from 'vue-context';
import 'vue-context/src/sass/vue-context.scss';

const constructorSSML = construct;
export default {
    data(){
        return{
        numID:1,
        viewMenu: false,
        top: '0px',
        left: '0px',
        listSSML:[],
        choosenTextData:{}
        }
    },
    components: {
            VueContext 
    },
    methods:{
      unwrap(wrapper) {
      // place childNodes in document fragment
      var docFrag = document.createDocumentFragment();
      while (wrapper.firstChild) {
        var child = wrapper.removeChild(wrapper.firstChild);
        docFrag.appendChild(child);
      }

      // replace wrapper with document fragment
      wrapper.parentNode.replaceChild(docFrag, wrapper);
    },
    

// Try it:
// unwrap(document.getElementById("test"));
      getContent(){
        console.log(this.$refs.dynamicDiv.innerHTML)
        var str = this.$refs.dynamicDiv.innerHTML;
        str =  str.replace("></break>","/>")
        console.log(str)
      },
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
            this.numID++;
            span.setAttribute("id",this.numID)
            let x = new Object(constructorSSML)
            x.id = this.numID;
            this.listSSML.push(x)
            span.onclick = function(){
              _this.getlistSSML(this.id)
            }
            span.style.color = "red";
            span.appendChild(selectedText);
            selection.insertNode(span);
          }
      },
      tagBreak(){
        var selection = document.getSelection().getRangeAt(0);
        var toInsert = document.createElement(constructorSSML.break.tag);
        toInsert.innerText = constructorSSML.break.innerText
        toInsert.style[constructorSSML.break.styleType] = constructorSSML.break.styleValue
        toInsert.setAttribute("id",this.numID)
        var _this = this
        toInsert.onclick = function(){
              _this.getlistSSML(this.id)
            }
        // var newContent = oldContent.substring(0, cursorPos) + toInsert + oldContent.substring(cursorPos);
        selection.insertNode(toInsert);
      },
      getlistSSML(id){
        // console.log("id = "+id)
        var one = this.listSSML.filter(function(one){
            return one.id == id
        })
        this.choosenTextData = one[0]
        // console.log(this.choosenTextData)
        this.$emit("transferObj",this.choosenTextData)
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