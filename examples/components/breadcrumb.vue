<template>
    <div>
        <p>基础</p>
        <ivue-breadcrumbs>
            <ivue-breadcrumbs-item to="/1">1</ivue-breadcrumbs-item>
            <ivue-breadcrumbs-item to="/2">2</ivue-breadcrumbs-item>
            <ivue-breadcrumbs-item>3</ivue-breadcrumbs-item>
        </ivue-breadcrumbs>

        <p>separator</p>
        <ivue-breadcrumbs separator="<i class='ivue-icon'>home</i>">
            <ivue-breadcrumbs-item to="/1">1</ivue-breadcrumbs-item>
            <ivue-breadcrumbs-item to="/2">2</ivue-breadcrumbs-item>
        </ivue-breadcrumbs>

        <p>flex-end</p>
        <ivue-breadcrumbs direction="flex-end">
            <ivue-breadcrumbs-item to="/1">1</ivue-breadcrumbs-item>
            <ivue-breadcrumbs-item to="/2">2</ivue-breadcrumbs-item>
        </ivue-breadcrumbs>

        <p>center</p>
        <ivue-breadcrumbs direction="center">
            <ivue-breadcrumbs-item to="/1">1</ivue-breadcrumbs-item>
            <ivue-breadcrumbs-item to="/2">2</ivue-breadcrumbs-item>
        </ivue-breadcrumbs>

        <p>
            在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
        </p>

        <ivue-breadcrumbs>
            <ivue-breadcrumbs-item to="/1" replace>1</ivue-breadcrumbs-item>
            <ivue-breadcrumbs-item to="/2" replace>2</ivue-breadcrumbs-item>
        </ivue-breadcrumbs>
    </div>
</template>

<script>
export default {
    // data: () => ({
    //     items: [
    //         {
    //             text: 'Dashboard',
    //             disabled: false,
    //             href: 'breadcrumbs_dashboard'
    //         },
    //         {
    //             text: 'Link 1',
    //             disabled: false,
    //             href: 'breadcrumbs_link_1'
    //         },
    //         {
    //             text: 'Link 2',
    //             disabled: true,
    //             href: 'breadcrumbs_link_2'
    //         }
    //     ]
    // })
}
</script>
