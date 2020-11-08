<template>
    <el-drawer
        :visible.sync="showModal"
        id="creatStream"
        :wrapper-closable="false"
        @close="closeModal"
    >
        <div
            slot="title"
            class="bold fs20"
        >
            创建仲裁申请
        </div>
        <div class="px20">
            <el-form
                ref="createForm"
                label-position="top"
                label-width="80px"
                :model="params"
            >
                <el-form-item label="详情描述">
                    <el-input
                        type="textarea"
                        v-model="params.recipient"
                    />
                </el-form-item>
                <el-form-item label="文件上传">
                    <el-upload
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-change="handleExceed"
                        :http-request="customUpload"
                        :file-list="fileList"
                    >
                        <el-button
                            size="small"
                            type="primary"
                        >
                            点击上传
                        </el-button>
                        <div
                            slot="tip"
                            class="el-upload__tip"
                        >
                            只能上传jpg/png文件，且不超过500kb
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    :label="$t('createstream.create.time')"
                >
                    <el-date-picker
                        v-model="dateTime"
                        align="right"
                        style="width:100%"
                        type="datetimerange"
                        :range-separator="$t('createstream.create.to')"
                        :start-placeholder="$t('createstream.create.startTime')"
                        :end-placeholder="$t('createstream.create.stopTime')"
                        :picker-options="pickerOptions"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        round
                        class="mt36 py16"
                        style="width:100%"
                        type="primary"
                        :disabled="isOnlyClick"
                        @click="save"
                    >
                        {{ isOnlyClick? $t('createstream.create.creating'):$t('createstream.create.create') }}<i class="el-icon-right el-icon--right" />
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
import {setMoneyWeb3} from '@/utils/utils.js'
import {getInstance} from '@/utils/connectContract'
export default {
    name: 'CreatStream',
    props: {
        showModal: {
            type: Boolean,
            default() {
                return false;
            }
        },
    },
    data() {
        return {
            fileList: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            ],
            dateTime: [],
            params: {},
            pickerOptions: {
                disabledDate(time) {
                    return moment(time) <= moment().subtract(1, 'days');
                },
            },
            isOnlyClick: false, //创建流只可点击一次
            activeTab: '',
            approveAmount: 0,
        }
    },
    computed: {
        ...mapState(['user', 'recipient']),
    },
    async created(){
        this.allInstance = await getInstance()
    },
    watch: {
        showModal(val){
            if (val) {
                this.isOnlyClick = false
                this.initParam()
            }
        },
    },
    methods: {
        customUpload(file){
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file.file);

            fileReader.onloadend = () =>{
                // console.log(new ArrayBuffer(10),fileReader.result)
                this.uploadIpfs(fileReader.result, file.file.name)
            }
        },
        uploadIpfs(data, fileName){//data:File转bufferArray文件类型
            this.$http.post('https://ipfs.kleros.io/add', JSON.stringify({
                fileName: fileName,
                // eslint-disable-next-line
                buffer: Buffer.from(data)
            }), {
                headers: {'content-type': 'application/json'},
            }).then(res=>{
                console.log(res)
            })
        },
        handleExceed(files, fileList) {
            // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            console.log(files, fileList)
        },
        initParam(){
            this.params = {
                recipient: '', //接收者
                startTime: moment().add(5, 'minutes'), //开始时间
            }
            this.dateTime = [moment().add(5, 'minutes'), moment().add(1, 'days')]
        },
        async save() {
            let isOk = await this.validate(this.params)
            if (!isOk) return
            this.isOnlyClick = true
            let res
            //批准、铸币
            await this.allInstance.testnetInstance.methods.approve(this.allInstance.sablierInstance.options.address, setMoneyWeb3(this.params.deposit)).send({
                gas: 500000,
                from: this.user
            });
            res = await this.allInstance.sablierInstance.methods
                .createStream(this.params.recipient, setMoneyWeb3(this.params.deposit),
                    this.params.tokenAddress, moment(this.dateTime[0]).unix(), moment(this.dateTime[1]).unix())
                .send({
                    gas: 500000,
                    from: this.user
                })
            if (res) {
                this.isOnlyClick = false
                this.$alert(this.$t('createstream.create.createSuccess'), this.$t('streamInfo.function.operationHint'), {type: 'success'})
                this.closeModal()
            }

        },
        async validate(params){
            try {
                if (!params.recipient) throw new Error(this.$t('createstream.validate.recipient'))
                if (!params.tokenAddress) throw new Error(this.$t('createstream.validate.tokenAddress'))
                if (this.activeTab == 'fixedFlowrate'){
                    if (!params.maxAmount || params.maxAmount <= 0) throw new Error(this.$t('createstream.validate.maxAmount'))
                    if (!params.ratePerSecond || params.ratePerSecond <= 0) throw new Error(this.$t('createstream.validate.ratePerSecond'))
                    if (!params.startTime || params.startTime <= moment()) throw new Error(this.$t('createstream.validate.startTime'))
                } else {
                    if (!params.deposit || params.deposit <= 0) throw new Error(this.$t('createstream.validate.deposit'))
                    if (!this.dateTime || this.dateTime[0] <= moment()) throw new Error(this.$t('createstream.validate.dateTime'))
                }
            }
            catch (err){
                this.$notify.error({title: err.message})
                return false
            }
            return true
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>


