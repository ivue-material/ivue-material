<template>
    <div>
        <IvueTable
            border=""
            :tableHeader="columns1"
            :tableData="data1"
            :headerColor="headerColor"
            height="200"
            width="600"
        ></IvueTable>
        <!-- <IvueTable :tableHeader="columns1" :tableData="data1" :rowClassName="rowClassName"></IvueTable> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            columns1: [
                {
                    title: 'Name',
                    key: 'name',
                    className: 'demo-table-info-column',
                    fixed: 'left'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address',
                    fixed: 'right'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02',
                    cellClassName: {
                        age: 'demo-table-info-cell-age',
                        address: 'demo-table-info-cell-address'
                    }
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            headerColor: [{
                bg: '#F41D74',
                color: '#fff'
            }, {
                bg: 'primary',
                color: '#fff'
            }]
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
