<template>
    <div>
        <IvueList>
            <IvueListItem>Plain Text</IvueListItem>
            <IvueListItem :disabled="true">button</IvueListItem>
            <IvueListItem @click>button</IvueListItem>
            <IvueListItem href="'www.baidu.com'">link</IvueListItem>
            <IvueListItem to="/icon">routerLink</IvueListItem>
        </IvueList>

        <p>expand</p>
        <IvueList :ivueExpandSingle="expandSingle">
            <IvueListItem ivue-expand :ivue-expanded.sync="expandNews">
                <span class="ivue-list-item-text">News</span>
                <IvueList slot="ivue-expand">
                    <IvueListItem @click="" class="ivue-inset">World</IvueListItem>
                    <IvueListItem @click="" class="ivue-inset">World</IvueListItem>
                </IvueList>
            </IvueListItem>
        </IvueList>
    </div>
</template>

<script>
export default {
    data () {
        return {
            expandNews: false,
            expandSingle: false
        }
    }
}
</script>
