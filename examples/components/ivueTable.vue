<template>
    <div>
        <IvueTable
            border=""
            :tableHeader="columns2"
            :headerColor="headerColor"
            :tableData="data1"
            height="200"
            width="600"
            ref="selection"
            @on-select-change="handleSelection"
            @on-select-all="handleSelectionAll"
            @on-select-cancel="handleSelectCancel"
            loading
        ></IvueTable>
        <Button @click="handleSelectAll(true)">Set all selected</Button>
        <Button @click="handleSelectAll(false)">Cancel all selected</Button>
        <IvueTable
            :showHeader="false"
            border=""
            :tableHeader="columns2"
            :tableData="data1"
            width="600"
            height="200"
            highlightRow
            ref="highlightRow"
            @on-current-row="handleCurrentRow"
        ></IvueTable>
        <p>newData: {{newData && newData.name}}</p>
        <p>oldData: {{oldData && oldData.name}}</p>
        <IvueButton @click="handleClick">清除 highlightRow</IvueButton>
        <IvueTable
            :tableHeader="columns1"
            :tableData="data1"
            width="600"
            height="200"
            highlightRow
            :showHeader="false"
        >
            <template slot-scope="{ row }" slot="age">age</template>
            <template slot-scope="{ row }" slot="province">province</template>
        </IvueTable>
        <IvueTable
            :tableHeader="columns3"
            :tableData="data1"
        >
        </IvueTable>
    </div>
</template>

<script>
export default {
    data () {
        return {
            columns3: [
                {
                    title: 'Age',
                    key: 'age',
                },
            ],
            columns1: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h('div', `${params.row.name}`)
                    }
                },
                {
                    title: 'Name',
                    key: 'name',
                    width: 100,
                    renderHeader: (h) => {
                        return h('div', 'hello')
                    },
                },
                {
                    title: 'Age',
                    key: 'age',
                    width: 100,
                    align: 'center',
                    slot: 'age'
                },
                {
                    title: 'Province',
                    key: 'province',
                    width: 100,
                    align: 'left',
                    slot: 'province'
                },
                {
                    title: 'City',
                    key: 'city',
                    width: 100,
                    align: 'right',
                },
                {
                    title: 'Address',
                    key: 'address',
                    width: 200
                },
                {
                    title: 'Postcode',
                    key: 'zip',
                    width: 100,
                    fixed: 'right'
                },
            ],
            columns2: [
                {
                    type: 'selection',
                    width: 60,
                    checkBoxColor: '#4177f6',
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 60,
                    align: 'center',
                    indexMethod: (row) => {
                        return row._index % 2
                    }
                },
                {
                    title: 'Name',
                    key: 'name',
                    className: 'demo-table-info-column',
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address',
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000,
                    checkBoxColor: '#4177f6',
                    _checked: true,
                    _expanded: true,
                    _highlight: true,
                    _disabled: true
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000,
                    cellClassName: {
                        name: 'demo-table-info-cell-name'
                    },
                    checkBoxColor: 'red',
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000,
                    cellClassName: {
                        age: 'demo-table-info-cell-age',
                        address: 'demo-table-info-cell-address'
                    }
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    province: 'Canada',
                    city: 'Ottawa',
                    zip: 100000,
                    className: 'demo-table-info-column'
                }
            ],
            headerColor: [{
                bg: '#F41D74',
                color: '#fff'
            }, {
                bg: 'primary',
                color: '#fff'
            }],
            newData: '',
            oldData: ''
        }
    },
    methods: {
        rowClassName (row, index) {
            if (index === 1) {
                return 'demo-table-info-row';
            } else if (index === 3) {
                return 'demo-table-error-row';
            }
            return '';
        },
        handleClick () {
            this.$refs.highlightRow.clearCurrentRow();
        },
        handleCurrentRow (newData, oldData) {
            this.newData = newData;
            this.oldData = oldData;
        },
        handleSelection (data) {
            console.log(data)
        },
        handleSelectionAll (data) {
            console.log(`选择了全部:${data}`)
        },
        handleSelectCancel (data, selectOption) {
            console.log('取消选项')
            console.log(data)
            console.log(selectOption)
        },
        handleSelectAll (status) {
            this.$refs.selection.handleSelectAll(status);
        }
    }
}
</script>

<style lang="scss">
.ivue-table-wrapper {
  margin-top: 20px;
}

.ivue-table .ivue-table-td.demo-table-info-column {
  background-color: #4177f6;
  color: #fff;
}

.ivue-table .demo-table-error-row .ivue-table-td {
  background-color: red;
}

.ivue-table .demo-table-info-row .ivue-table-td {
  background-color: yellow;
}

.ivue-table .ivue-table-td.demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivue-table .ivue-table-td.demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
