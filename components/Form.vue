<template>
  <div id="formFeedback">
    <div class="left">
        <p>{{ $t('def.form.top') }}</p>
        <h2>{{ $t('def.form.title') }}</h2>
        <span>{{ $t('def.form.label') }}</span>
    </div>
    <div class="right">
        <form action="post">
            <input type="text" :placeholder="$t('def.form.inpPla')" name="feedback" id="">
            <button class="btn">{{ $t('def.form.subscribe') }}</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>