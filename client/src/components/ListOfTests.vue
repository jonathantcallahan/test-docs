<template>
    <div>
        <div>
            <div v-for='tag in Object.keys(deviceTags)'
            :class="{ 'gray-text' : !deviceTags[tag] }"
            @click='hideClass(tag, "deviceTags")' 
            :key='"tag-" + tag'>{{tag}}</div>
        </div>
        <div>
            <div v-for='tag in Object.keys(pageTags)'
            :class="{ 'gray-text' : !pageTags[tag] }"
            @click='hideClass(tag, "pageTags")' 
            :key='"tag-" + tag'>{{tag}}</div>
        </div>
        <div v-for='(test, index) in tests' :key="'test_' + index"
            :class="{ hidden: test.hidden }">
            <span class='pages-tag tag'>{{test.pages}}</span>
            <span class='devices-tag tag'>{{test.devices}}</span>
            <a class='test-link' :href=test.href target='_blank'><div>{{test.name}}</div></a>
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
            tests: [],
            deviceTags: {},
            pageTags: {},
            resultTags: []
        }
    },
    created: function () {
        axios.get('http://localhost:8081/')
            .then(response => {
                // this.tests = [...response.data]
                response.data.forEach(e => {
                    const d = e.split('-')
                    const test = {
                        href: `http://localhost:8081/api/pdf/${e.replace(' ','_')}`,
                        pages: d[0],
                        name: d[1],
                        devices: d[2].replace('.pdf',''),
                        hidden: false
                    }
                    this.tests.push(test)
                    this.pageTags[test.pages] = true
                    this.deviceTags[test.devices] = true
                })
                console.log(response)
            })

    },
    methods: {
        hideClass: function (tag,tagType) {
            console.log(tag)
            this.tests.forEach((e, i) => {
                if(e.devices == tag) this.tests[i].hidden = !this.tests[i].hidden
                if(e.pages == tag) this.tests[i].hidden = !this.tests[i].hidden
            })
            this[tagType][tag] = !this[tagType][tag]
        }
    }
}
</script>

<style>
    .test-link {
        display: inline-block;
        margin: 8px
    }

    .tag {
        font-size: .5rem;
        font-weight: bold;
        background-color: black;
        color: white;
        margin: 5px;
        padding: 2px 8px
    }

    .hidden {
        display: none
    }

    .gray-text {
        color:gray
    }
</style>