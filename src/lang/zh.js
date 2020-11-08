export default {
    home: {//首页文案
        h1: '连续的价值转移以实现实时支付',
        h2: '通过对货币的编程，我们建立了实时支付的智能合约并将其部署在以太坊上',
        startBtn: '开始使用',
        introduce: {
            title: '合约介绍',
            sablierTitle: '固定金额流支付',
            sablierVal: '在开始时间至结束时间内，流会以流动率每秒流向接收者。',
            fixedTitle: '固定流率流支付',
            fixedVal: '流在开始时间后每秒以特定的速率流向接收者，直到等于最大支付金额。无需设定结束时间，可增加最大支付金额，延长流的持续时间。',
            installmentTitle: '分期流支付',
            installmentVal: '尝试使用分期流支付，随意设置分期期数，不再占用现金流。',
            installmentDPTitle: '首付分期流支付',
            installmentDPVal: '为你的分期流支付添加首付比例，满足更多场景需求。',
        },
        footer: {
            contactTitle: '联系我们',
            focusText: '扫一扫关注我们',
        }
    },
    header: {//头部文案
        streampay: '流付-项目投资',
        home: '主页',
        dash: '仪表盘',
        docs: '文档',
        metamask: '请安装MetaMask钱包!'
    },
    dashboard: {//仪表盘文案
        dash: '仪表盘',
        stream: {
            fixedDeposit: '固定金额流',
            fixedFlowrate: '固定流率流',
            installment: '分期流',
            installementWithDP: '首付分期流',
        },
        create: '创建流',
        info: {
            id: '流ID',
            sender: '发送者',
            recipient: '接收者',
            deposit: '流金额',
            startTime: '开始时间',
            stopTime: '结束时间',
            maxAmount: '最大金额',
            ratepersecond: '流动率',
            numbeOfInstallments: '分期数',
            downpaymentRatio: '首付比例',
            maxStopTime: '结束时间',
            checkStream: '查看流',
            cancel: '已结束',
            operation: '操作',
        }
    },
    streamInfo: {//详情文案，streamInfo和cancelInfo可以共用
        streaminfo: '流信息',
        details: {
            info: '流信息详情',
            withdrawl: '提现',
            addAmount: '加额',
            installment: '分期支付',
            cancel: '取消',
        },
        info: {
            copy: '点击复制:{who}',
            sender: '发送者',
            recipient: '接收者',
            deposit: '流金额',
            startTime: '开始时间',
            stopTime: '结束时间',
            maxAmount: '最大支付金额',
            ratepersecond: '流动率',
            numbeOfInstallments: '分期数',
            downpaymentRatio: '首付金额',
            havebeenStreamed: '已流动',
            senderBalance: '发送者余额',
            recipientBalance: '接收者余额',
            fees: '手续费',
            haveBeenNumberOfInstallment: '已分期期数',
            nextOfInstallmentTime: '下期支付截止时间',
            duration: '持续时间'
        },
        function: {
            withdraw: '请输入提现金额',
            operation: '操作',
            confirm: '确认',
            cancel: '取消',
            format: '输入金额格式不正确',
            withdrawlSuccess: '提取金额成功!',
            withdrawlFailure: '提取金额失败!',
            operationHint: '操作提示',
            nextOfInstallmentTime: '已超过下期支付截止时间!',
            pay: '本期需支付金额:',
            paySuccess: '分期支付成功!',
            payFailure: '分期支付失败!',
            addInput: '请输入增加的金额:',
            addSuccess: '增加成功!',
            addFailure: '增加失败!',
            cancelStream: '是否取消流?',
            cancelSuccess: '取消成功!',
            cancelFailure: '取消失败!',
        },
    },
    cancelStream: {//创建流文案
        streaminfo: '流信息',
        details: {
            info: '流信息详情',
        },
        info: {
            sender: '发送者',
            recipient: '接收者',
            deposit: '流金额',
            startTime: '开始时间',
            stopTime: '结束时间',
            actualStopTime: '实际结束时间',
            maxAmount: '最大支付金额',
            ratepersecond: '流动率',
            numbeOfInstallments: '分期数',
            downpaymentRatio: '首付金额',
            endedStreamed: '流已结束',
            endOfsenderBalance: '结束前发送者余额',
            endOfrecipientBalance: '结束前接收者余额',
            fees: '手续费',
            haveBeenNumberOfInstallment: '已分期期数',
            duration: '持续时间',
            haveBeenPaidAmount: '已支付金额',
        },
    },
    createstream: {
        create: {
            create: '创建流',
            types: '创建流类型',
            who: '谁是收件人？（ENS名称或以太坊地址）',
            deposit: '流金额',
            maxAmount: '最大金额转账',
            ratepersecond: '流动率（每秒流动金额）',
            token: '币种',
            choose: '请选择币种',
            time: '起止时间',
            startTime: '开始日期',
            stopTime: '结束日期',
            to: '至',
            choosetime: '选择开始日期时间',
            numbeOfInstallments: '分期数',
            fees: '接收者收取的手续费（每期每秒每ETH收取的手续费，单位为1/10**18）',
            downpaymentRatio: '首付比例',
            creating: '创建中...',
            createSuccess: '创建成功!',
        },
        validate: {
            recipient: '收件人为必填项！',
            tokenAddress: '币种为必填项！',
            maxAmount: '最大金额为必填项，且需大于0！',
            ratePerSecond: '流动率为必填项，且需大于0！',
            startTime: '开始时间为必填项，且需大于当前时间！',
            deposit: '流金额为必填项，且需大于0！',
            dateTime: '起止时间为必填项，且开始时间需大于当前时间！',
            numberOfInstallments: '分期数为必填项，且需大于0！',
            feesOfRecipientPer: '手续费为必填项，最小为0！',
            remainder: '持续时间除分期数不得有余数！',
            downPaymentRatio: '首付比例为必填项，且范围在0～100之间！',
        }
    }
}