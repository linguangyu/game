const routes = [
  {
    path: '/login/',
    name: 'login',
    component: (resolve) => {
      require(['./../page/personal/login'], resolve)
    },
    alias: '/'
  }, {
    path: '/register/',
    name: 'register',
    component: (resolve) => {
      require(['./../page/personal/register'], resolve)
    }
  }, {
    path: '/resetpassword/',
    name: 'reset-password',
    component: (resolve) => {
      require(['./../page/personal/resetPassword'], resolve)
    }
  }, {
    path: '',
    component: (resolve) => {
      require(['./../page/routerview/index'], resolve)
    },
    children: [
      {
        path: '/market/',
        component: (resolve) => {
          require(['./../page/market/index'], resolve)
        },
      },
      {
        path: '/center/',
        component: (resolve) => {
          require(['./../page/center/index'], resolve)
        }
      },
      {
        path: '/viewing/',
        name: 'viewing',
        component: (resolve) => {
          require(['./../page/viewing/index'], resolve)
        }
      },
      {
        path: '/tools/',
        name: 'tools',
        component: (resolve) => {
          require(['./../page/tool/index'], resolve)
        }
      }
    ]
  }, {
    path: '/market/against',
    name: 'against',
    component: (resolve) => {
      require(['./../page/market/against'], resolve)
    }
  }, {
    path: '/market/HSFriend',
    name: 'game',
    component: (resolve) => {
      require(['./../page/market/game.vue'], resolve)
    }
  }, {
    path: '/market/gameleveling',
    name: 'gameleveling',
    component: (resolve) => {
      require(['./../page/market/gameleveling'], resolve)
    }
  }, {
    path: '/market/androidAndIos',
    name: 'androidAndIos',
    component: (resolve) => {
      require(['./../page/market/androidAndIos'], resolve)
    }
  }, {
    path: '/market/needwhereas',
    name: 'needwhereas',
    component: (resolve) => {
      require(['./../page/market/needwhereas'], resolve)
    }
  }, {
    path: '/market/checkOrder/:checkId',
    name: 'checkOrder',
    component: (resolve) => {
      require(['./../page/market/checkOrder'], resolve)
    }
  }, {
    path: '/market/negotiate',
    name: 'negotiate',
    component: (resolve) => {
      require(['./../page/market/negotiate'], resolve)
    }
  }, {
    path: '/market/consultationRecord/:consultationRecordId',
    name: 'consultationRecord',
    component: (resolve) => {
      require(['./../page/market/consultationRecord'], resolve)
    }
  }
  , {
    path: '/market/neimg/:neimgId',
    name: 'neimg',
    component: (resolve) => {
      require(['./../page/market/neimg'], resolve)
    }
  }, {
    path: '/market/electric',
    name: 'electric',
    component: (resolve) => {
      require(['./../page/market/electric.vue'], resolve)
    }
  }, {
    path: '/sell',
    name: 'sell',
    component: (resolve) => {
      require(['./../page/market/sell'], resolve)
    }
  }, {
    path: '/BuyAmerican',
    name: 'BuyAmerican',
    component: (resolve) => {
      require(['./../page/market/BuyAmerican'], resolve)
    }
  }, {
    path: '/market/HSFriend/extract/',
    name: 'extract',
    component: (resolve) => {
      require(['./../page/market/extract'], resolve)
    },
    alias: '/extract'

  }, {
    path: '/tagCharge',
    name: 'tagCharge',
    component: (resolve) => {
      require(['./../page/market/tagCharge'], resolve)
    }
  }, {
    path: '/market/record/:orderId',
    name: 'record',
    component: (resolve) => {
      require(['./../page/market/record'], resolve)
    }
  }, {
    path: '/market/HSFriend/deposit',
    name: 'deposit',
    component: (resolve) => {
      require(['./../page/market/deposit'], resolve)
    }
  }, {
    path: '/market/address',
    name: 'address',
    component: (resolve) => {
      require(['./../page/market/address'], resolve)
    }
  }, {
    path: '/market/extractrecords',
    name: 'extractrecords',
    component: (resolve) => {
      require(['./../page/market/extractrecords'], resolve)
    }
  }, {
    path: '/market/Intherecord',
    name: 'Intherecord',
    component: (resolve) => {
      require(['./../page/market/Intherecord'], resolve)
    }
  }, {
    path: '/market/purchase',
    name: 'purchase',
    component: (resolve) => {
      require(['./../page/market/purchase'], resolve)
    }
  }, {
    path: '/market/buyback',
    name: 'buyback',
    component: (resolve) => {
      require(['./../page/market/buyback'], resolve)
    }
  }, {
    path: '/center/edit',
    name: 'edit',
    component: (resolve) => {
      require(['./../page/center/edit'], resolve)
    }
  }, {
    path: '/center/money',
    name: 'money',
    component: (resolve) => {
      require(['./../page/center/money'], resolve)
    }
  }, {
    path: '/center/myFriendMatch',
    name: 'myFriendMatch',
    component: (resolve) => {
      require(['./../page/center/myFriendMatch'], resolve)
    }
  }, {
    path: '/center/kbi',
    name: 'kbi',
    component: (resolve) => {
      require(['./../page/center/kbi'], resolve)
    }
  }, {
    path: '/center/userFriendLogs',
    name: 'userFriendLogs',
    component: (resolve) => {
      require(['./../page/center/userFriendLogs'], resolve)
    }
  }
  , {
    path: '/center/salefirend',
    name: 'salefirend',
    component: (resolve) => {
      require(['./../page/center/salefirend'], resolve)
    }
  }, {
    path: '/FAQ/',
    name: 'issue',
    component: (resolve) => {
      require(['./../page/center/issue'], resolve)
    }
  }, {
    path: '/center/abouts.html',
    name: 'asme',
    component: (resolve) => {
      require(['./../page/center/asme'], resolve)
    },
    alias: '/center/abouts'
  }, {
    path: '/center/tickling',
    name: 'tickling',
    component: (resolve) => {
      require(['./../page/center/tickling'], resolve)
    }
  }, {
    path: '/center/ticklingdetails/:ticklingId',
    name: 'ticklingdetails',
    component: (resolve) => {
      require(['./../page/center/ticklingdetails'], resolve)
    }
  }, {
    path: '/center/feedback',
    name: 'feedback',
    component: (resolve) => {
      require(['./../page/center/feedback'], resolve)
    }
  }, {
    path: '/center/OrderLists/',
    name: 'OrderLists',
    component: (resolve) => {
      require(['./../page/center/OrderList'], resolve)
    }
  }, {
    path: '/viewing/:ProductID/:newsId',
    name: 'news',
    component: (resolve) => {
      require(['./../page/viewing/news'], resolve)
    },

  }, {
    path: '/FAQ/:id/',
    name: 'issuelist',
    component: (resolve) => {
      require(['./../page/center/issuelist'], resolve)
    }
  }, {
    path: '/center/specific/:specificId',
    name: 'specific',
    component: (resolve) => {
      require(['./../page/center/specific'], resolve)
    }
  }, {
    path: '/notFoundPage',
    name: 'notFoundPage',
    component: (resolve) => {
      require(['./../page/NotFoundComponent/notFoundPage.vue'], resolve)
    }
  }, {
    path: '/market/booster/',
    name: 'GenerationJumpPage',
    component: (resolve) => {
      require(['./../page/booster/GenerationJumpPage.vue'], resolve)
    }
  },
  {
    path: '/market/booster/2/',
    name: 'booster',
    component: (resolve) => {
      require(['./../page/booster/booster.vue'], resolve)
    },
  },
  {
    path: '/market/booster/2/:DailianId',
    name: 'goldAvatar0',
    component: (resolve) => {
      require(['./../page/booster/goldAvatar0.vue'], resolve)
    },
  }
  ,
  {
    path: '/market/AccountTarde/',
    name: 'JumpingPage',
    component: (resolve) => {
      require(['./../page/accountNumber/JumpingPage.vue'], resolve)
    }
  },
  {
    path: '/market/AccountTarde/gameID=:gameID/',
    name: 'accountNumber2',
    component: (resolve) => {
      require(['./../page/accountNumber/accountNumber.vue'], resolve)
    }
  }, {
    path: '/market/AccountTarde/gameID=:gameID/?productID=:accoutNumberDateilsId',
    name: 'accoutNumberDateils',
    component: (resolve) => {
      require(['./../page/accountNumber/accoutNumberDateils.vue'], resolve)
    }
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: (resolve) => {
      require(['./../page/accountNumber/orderDetails.vue'], resolve)
    }
  }, {
    path: '/accountNumber/PaymentOrder/:PaymentOrderId',
    name: 'PaymentOrder',
    component: (resolve) => {
      require(['./../page/accountNumber/PaymentOrder.vue'], resolve)
    }
  }, {
    path: '/accountNumber/TheOrderDetails/:TheOrderDetailsId',
    name: 'TheOrderDetails',
    component: (resolve) => {
      require(['./../page/accountNumber/TheOrderDetails.vue'], resolve)
    }
  }, {
    path: '/tools/HSCards/',
    name: 'cardInquiries',
    component: (resolve) => {
      require(['./../page/cardInquiries/cardInquiries.vue'], resolve)
    },


  }, {
    path: '/tools/HSCards/collectionList/',
    name: 'collectionList',
    component: (resolve) => {
      require(['./../page/cardInquiries/collectionList.vue'], resolve)
    }
  },
  {
    path: '/tools/HSCards/:carId',
    name: 'singleCardDetails',
    component: (resolve) => {
      require(['./../page/cardInquiries/singleCardDetails.vue'], resolve)
    },
  }, {
    path: '/tools/DayByDay/',
    name: 'DayByDay',
    component: (resolve) => {
      require(['./../page/DayByDay/DayByDay.vue'], resolve)
    }
  }, {
    path: '/tools/DayByDay/DayList/',
    name: 'DayList',
    component: (resolve) => {
      require(['./../page/DayByDay/DayList.vue'], resolve)
    }
  },
  //分享页面
  {
    path: '/SharePage/',
    name: 'SharePage',
    component: (resolve) => {
      require(['./../components/fx/fx.vue'], resolve)
    }
  },
  {
    path: '/share.html',
    // path: '/share/',
    name: 'ShareDetails',
    component: (resolve) => {
      require(['./../components/fx/xq.vue'], resolve)
    },
  },
  {
    path: '/classification/',
    // path: '/share/',
    name: 'classification',
    component: (resolve) => {
      require(['./../page/market/classification/classification.vue'], resolve)
    },
  },
];

export default routes
