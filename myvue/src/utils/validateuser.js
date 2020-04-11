import Vue from "vue";
import router from "../router";
import VueCookies from 'vue-cookies'
import md5 from 'js-md5'
import axios from "axios"
Vue.prototype.$md5 = md5
Vue.use(VueCookies)


export var validateuser = function (){
		let username = Vue.$cookies.get("username")
		let password = Vue.$cookies.get("password")
		axios.post("http://116.62.47.156/login/",{"username":username,"password":password}).then(response=>{
				if(response.data=="ok"){
					Vue.username = username
				}
				else{
					window.location = "/"
				}
		}).catch(error=>{
					console.log(error)
				})
}