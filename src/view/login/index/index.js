import Vue from 'vue';
import app from './App';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import '../../../static/css/base.css';

Vue.use(iview)

new Vue({
    el: 'body',
    components: {
        app
    }
});
