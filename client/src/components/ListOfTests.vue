<template>
    <div>
        <div v-for='(test, index) in tests'>
            <div :key=index>{{test}}</div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'list-of-tests',
    props: [],
    data: function() {
        return {
            tests: ['test 1', 'test 2']
        }
    },
    created: function () {
        axios.get('http://localhost:8081/')
            .then(response => {
                this.tests = [...this.tests, ...response.data]
                console.log(response)
            })

    }
}
</script>