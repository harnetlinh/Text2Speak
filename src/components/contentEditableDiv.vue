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
import VueContext from 'vue-context';
import 'vue-context/src/sass/vue-context.scss';
export default {
    data(){
        return{
        viewMenu: false,
        top: '0px',
        left: '0px'
        }
    },
    components: {
            VueContext 
    },
    methods:{
        red(data){
      // {     
          console.log(this.$refs.dynamicDiv);
          console.log("RED") 
          console.log(document.getSelection())
          var selection = window.getSelection().getRangeAt(0);
          if(window.getSelection().baseNode.parentNode.id != "sel") return;
          var selectedText = selection.extractContents();
          var span = document.createElement("speak");
          span.style.backgroundColor = "red";
          span.appendChild(selectedText);
          selection.insertNode(span);
      // }
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