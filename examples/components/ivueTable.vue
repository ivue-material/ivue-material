<template>
    <div>
        <IvueTable
            border=""
            :tableHeader="columns1"
            :headerColor="headerColor"
            :tableData="data1"
            height="200"
            width="600"
        ></IvueTable>
        <IvueTable border="" :tableHeader="columns2" :tableData="data1" width="600" height="200" highlightRow></IvueTable>
        <IvueTable :tableHeader="columns1" :tableData="data1" width="600" height="200"></IvueTable>
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
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: 'Age',
                    key: 'age',
                    width: 100
                },
                {
                    title: 'Province',
                    key: 'province',
                    width: 100
                },
                {
                    title: 'City',
                    key: 'city',
                    width: 100
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
                    zip: 100000
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
                    }
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
