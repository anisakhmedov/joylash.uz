<template>
    <div id="register">
        <div class="smth">
            <form action="" v-show="typeOfForm">
                <h2>Get Started Now</h2>
                <div>
                    <label for="">Name</label>
                    <input type="text" placeholder="Enter your name">
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="text" placeholder="Enter your email">
                </div>
                <div>
                    <label for="">Password</label>
                    <input type="text" placeholder="Enter your password">
                </div>
                <button>Sign Up</button>
                <p>or</p>
                <span>
                    Have an Account? <p @click="typeOfForm = !typeOfForm"> Sign In</p>
                </span>
            </form>
            <form action="" v-show="!typeOfForm">
                <h2>Welcome Back!</h2>
                <div>
                    <label for="">Email</label>
                    <input type="text" placeholder="Enter your email">
                </div>
                <div>
                    <label class="password" for="">Password <p style="cursor: pointer;">forgot password</p></label>
                    <input type="text" placeholder="Enter your password">
                    <div class="check" :class="checkType ? 'active' : ''" @click="checkType = !checkType">
                        <div class="box"><img src="~/public/icons/check-reg.svg" alt=""></div>
                        <p>Remember for 30 days</p>
                    </div>
                </div>
                <button>Sign In</button>
                <p>or</p>
                <span>
                    Don't have an account? <p @click="typeOfForm = !typeOfForm"> Sign Up</p>
                </span>
            </form>
        </div>
        <div class="bg">
            <img src="~/public/images/bg_first.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeOfForm: false,
            checkType: false
        }
    },
    methods: {
        // changeTypeForm: function() {
        //     console.log('change');

        // }
    }
}
</script>

<style></style>