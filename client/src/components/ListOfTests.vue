<template>
    <div>
        <div class='filter-item-container'>
            <div class='filter-items-header'>Device Types</div>
            <div v-for='tag in Object.keys(deviceTags)'
            :class="{ 'gray-text' : (selectedDevices.length && !selectedDevices.includes(tag)) }"
            class='filter-item'
            @click='hideClass(tag, "device")' 
            :key='"tag-" + tag'>{{tag}}</div>
        </div>
        <div class='filter-item-container'>
            <div class='filter-items-header'>Page Types</div>
            <div v-for='tag in Object.keys(pageTags)'
            :class="{ 'gray-text' : (selectedPages.length && !selectedPages.includes(tag))}"
            class='filter-item'
            @click='hideClass(tag, "page")' 
            :key='"tag-" + tag'>{{tag}}</div>
        </div>
        <div v-for='(test, index) in tests' :key="'test_' + index"
            :class="{ 
                hidden: (selectedDevices.length && !selectedDevices.includes(test.devices)) || (selectedPages.length && !selectedPages.includes(test.pages)) 
                }">
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
            resultTags: [],
            selectedPages: [],
            selectedDevices: []
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
            var tagSource 
            if(tagType == 'page'){ 
                tagType = 'selectedPages' 
                tagSource = 'pageTags'
            } 
            else {
                tagType = 'selectedDevices'
                tagSource = 'deviceTags'
            }
            if(this[tagType].includes(tag)){
                const i = this[tagType].indexOf(tag)
                this[tagType].splice(i,1)
            } else {
                this[tagType].push(tag)
                if(this[tagType].length == Object.keys(this[tagSource]).length){
                    this[tagType].length = 0
                }
            }
            // this.tests.forEach((e, i) => {
            //     if(e.devices == tag) this.tests[i].hidden = !this.tests[i].hidden
            //     if(e.pages == tag) this.tests[i].hidden = !this.tests[i].hidden
            // })
            // this[tagType][tag] = !this[tagType][tag]
        }
    }
}
</script>

<style>

    .filter-item-container {
        width: 40vw;
        display: inline-block;
        vertical-align: top;
        padding: 5px
    }

    .filter-items-header {
        font-weight: bold;
        margin-bottom: 5px
    }

    .filter-item {
        cursor: pointer;
        padding: 10px;
        user-select: none
    }

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