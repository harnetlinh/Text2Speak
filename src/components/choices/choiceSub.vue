<template>
  <div>
    <b-form-checkbox
      v-model="tempData.p.isActive"
      name="checkbox-p"
      value="1"
      unchecked-value="0"
    >
      p
    </b-form-checkbox>
    <b-form-checkbox
      v-model="tempData.paragraph.isActive"
      name="checkbox-paragraph"
      value="1"
      unchecked-value="0"
    >
      paragraph
    </b-form-checkbox>
    <b-form-checkbox
      v-model="tempData.say_as.isActive"
      name="checkbox-say_as"
      value="1"
      unchecked-value="0"
    >
      say_as
    </b-form-checkbox>
    <b-form-checkbox
      v-model="tempData.emphasis.isActive"
      name="checkbox-emphasis"
      value="1"
      unchecked-value="0"
    >
      emphasis
    </b-form-checkbox>
    <b-form-checkbox
      v-model="tempData.prosody.isActive"
      name="checkbox-prosody"
      value="1"
      unchecked-value="0"
    >
      prosody
    </b-form-checkbox>
    <b-form-checkbox
      
      v-model="tempData.break.isActive"
      name="checkbox-break"
      value="1"
      unchecked-value="0"
    >
      break
    </b-form-checkbox>
    <b-form-checkbox
      
      v-model="tempData.audio.isActive"
      name="checkbox-audio"
      value="1"
      unchecked-value="0"
    >
      audio
    </b-form-checkbox>
    <b-form-checkbox
      
      v-model="tempData.mark.isActive"
      name="checkbox-mark"
      value="1"
      unchecked-value="0"
    >
      mark
    </b-form-checkbox>
    <b-button @click="onClickSave()">SAVE</b-button>
  </div>
</template>

<script>
import construct from '../lib/contruct'
export default {
  data(){
    return{
      tempData:construct
    }
  },
  methods:{
    getData(data){
      this.tempData = data
    },
    onClickSave(){
      console.log(this.tempData.p)
    },
    setData(){
      this.$emit("transferObjFromChoice",this.tempData)
    }
  }
}
</script>

<style>

</style>