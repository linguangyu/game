<template>
  <div class="cardInquiries">
    <div class="cardInquiries_header">
      <div class="header_top">
        <div class="top_left" @click="RotateBack($event)">
          <img src="./imgaes/jiantou.png" alt="">
        </div>
        <div class="top_center">
          <input type="text" class="form_input" @change="CardnameaChenge" @click="SearchHistory"
                 v-model="sshuoCardNameons" placeholder="请输入你需要查找的卡牌名称" onfocus="this.placeholder=''"
                 onblur="if (this.placeholder === '') {this.placeholder='请输入你需要查找的卡牌名称'}">
          <img src="./imgaes/sousuoh.png" alt="">
        </div>
        <div class="top_right" @click="collectionListShow">
          <img src="./imgaes/aixin.png" alt="">
          <div class="top_collection" v-show="redbg"><p>{{totalCountSC}}<span v-show="aixinjiahao">+</span></p></div>
        </div>
      </div>
      <div class="header_bottom">
        <div class="bottom_left" @click="cardSet">
          <span ref="taokaName">所属卡牌集</span>
          <img src="./imgaes/sanjiaobai.png" alt="" ref="triangleRotation" v-if="!sanjiaochenge">
          <img src="./imgaes/sanjiaoh.png" alt="" ref="triangleRotationHaa" v-if="sanjiaochenge">
        </div>
        <div class="bottom_right" @click="filterShow" v-if="!yellowScreen">
          <span>筛选</span>
          <img src="./imgaes/sxuan.png" alt="">
        </div>
        <div class="bottom_right_show" v-if="yellowScreen" @click="filterBgShow">
          <span>筛选</span>
          <img src="./imgaes/sxuan2.png" alt="">
        </div>
      </div>
    </div>
    <div class="cardInquiries_all" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;"
         ref="scrollContainer">
      <div class="cardInquiries_list" v-for="(item,index) in items" @click="DetailsShow(item.id)">
        <div class="list_left">
          <img :src="'https://m.k5game.com/image/'+item.cardId+'.png'" alt="">
        </div>
        <div class="list_right">
          <div class="right_top">
            <p class="top_name">{{item.name}}</p>
          </div>
          <div class="right-bottom">
            <p class="bottom_fei">费用 : <span>{{item.cost}}</span></p>
            <p class="bootom_js">{{item.class}}-{{item.cardType}}</p>
            <p class="bootom_xy">稀有度 : {{item.rarity}}</p>
          </div>
        </div>
        <div class="list_shoucang" @click.stop="shouCClick(index,item)"
             :class="{list_shoucang_show: item.isCollection}">
          <img src="./imgaes/shoucaixin.png" alt="">
          {{item.isCollection ? '已收藏' : '收藏'}}
        </div>
        <div class="list_shoucang_series">
          所属卡组:{{item.cardSet}}
        </div>
      </div>
      <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
        <div class="infinite-scroll-preloader">
          <div class="preloader" ref="scrollShow"></div>
        </div>
      </mugen-scroll>
    </div>
    <!--卡组选择-->
    <div class="details_wrapper" v-show="detailsWrapper" @click="cardSetWrapper" @touchmove.prevent>
    </div>
    <div class="cardInquiries_details" v-show="details">
      <ul class="details_list">
        <li class="clearfix" @click="yqagl">
          <div class="li_left ">
            <p>勇闯安戈洛<span>135张</span> <span>JUG</span></p>
          </div>
          <div class="li_right ">标准赛制</div>
        </li>
        <li class="clearfix" @click="lzhdjsj">
          <div class="li_left ">
            <p>龙争虎斗加基森 <span>132张</span> <span>MSG</span></p>
          </div>
          <div class="li_right ">标准赛制</div>
        </li>
        <li class="clearfix" @click="klzzy">
          <div class="li_left">
            <p>卡拉赞之夜 <span>45张</span> <span>ONK</span></p>
          </div>
          <div class="li_right">标准赛制</div>
        </li>
        <li class="clearfix" @click="sgzsddy">
          <div class="li_left">
            <p>上古之神的低语<span>134张</span> <span>WOG</span></p>
          </div>
          <div class="li_right">标准赛制</div>
        </li>
        <li class="clearfix" @click="txzxh">
          <div class="li_left">
            <p>探险者协会<span>45张</span> <span>LOE</span></p>
          </div>
          <div class="li_right">狂野赛制</div>
        </li>
        <li class="clearfix" @click="gjdsl">
          <div class="li_left">
            <p>冠军的试炼<span>132张</span> <span>TGT</span></p>
          </div>
          <div class="li_right">狂野赛制</div>
        </li>
        <li class="clearfix" @click="hssdhy">
          <div class="li_left">
            <p>黑石山的火焰<span>31张</span> <span>BRM</span></p>
          </div>
          <div class="li_right">狂野赛制</div>
        </li>
        <li class="clearfix" @click="djdzzr">
          <div class="li_left">
            <p>地精大战侏儒<span>123张</span> <span>GVG</span></p>
          </div>
          <div class="li_right">狂野赛制</div>
        </li>
        <li class="clearfix" @click="nksms">
          <div class="li_left">
            <p>纳克萨玛斯<span>30张</span> <span>NAXX</span></p>
          </div>
          <div class="li_right">狂野赛制</div>
        </li>
        <li class="clearfix" @click="jbxl">
          <div class="li_left">
            <p>基本系列<span>142张</span> <span>BASIC</span></p>
          </div>
          <div class="li_right">标准赛制</div>
        </li>
        <li class="clearfix" @click="jdxl">
          <div class="li_left">
            <p>经典系列<span>239张</span> <span>CLASSIC</span></p>
          </div>
          <div class="li_right">标准赛制</div>
        </li>
      </ul>
    </div>
    <!--筛选页面-->
    <div class="filter_wrapper" v-show="filterWrapper" @click="filterWrapperShow" @touchmove.prevent></div>
    <div class="cardInquiries_filter" v-show="filter" @touchmove.prevent>
      <div class="filter_title">
        <p v-if="yellowScreen" @click="Reset">重置</p>
      </div>
      <div class="filter_content">
        <div class="content_left">
          <div v-for="(item,index) in sevenCourses" class="left_title" @click="titleShow=index,listShow(index)">
            {{item.name}}
            <div class="left_bar" v-if="index==titleShow "></div>
          </div>
        </div>
        <div class="content_right" v-for="(item,index) in DetailsL" ref="contentRight">
          <div v-for="(list,index) in item" class="right_all" ref="Unchecked">
            <div v-for="(CareerList,index) in list" class="right_list">
              <input type="radio" @click='btn(CareerList.name,CareerList.value)' :id='CareerIDcomputed=CareerList.id'
                     :name='CareerList.value' :value='CareerList.name'/>
              <p></p>
              <label :for="CareerIDcomputed">{{CareerList.name}}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="filter_food" @click="sure">确定</div>
    </div>
    <!-- //单卡详情页-->
    <!--<singleCardDetails :item="CardedDetails" ref="singleCardDetails"></singleCardDetails>-->
    <!--收藏卡片详情-->
    <searchCard v-show="cardSearch" :LocalData="searchHistoryName" @add="DeleteStoredData"
                @LocalDataClickAdd="AcceptLocalDataClick" @popularSearchesClickAdd="HotSearchClick"></searchCard>
    <div class="cardInquiries_Nothing" v-show="NotFound">
      <p>没有找到如何东西，请您重新设置条件或者输入您需要查询的卡.</p>
    </div>
    <Whether ref="Whether"></Whether>
  </div>
</template>
<script charset="UTF-8">
  import singleCardDetails from './singleCardDetails.vue';
  import collectionList from './collectionList.vue';
  import searchCard from './searchCard.vue';
  import * as api from '../../api/singleCard.js'
  import MugenScroll from 'vue-mugen-scroll'
  import Whether from '../../components/Whether/Whether.vue'
  import * as checkJs from '../../assets/js/pubFunc'

  export default {
    components: {
      singleCardDetails,
      collectionList,
      searchCard,
      MugenScroll,
      Whether
    },
    computed: {},
    data() {
      return {
        shoucShow: false,
        //用于清单的标题
        sevenCourses: [
          {
            name: '职业'
          }, {
            name: '法力消耗'
          }, {
            name: '稀有度'
          }, {
            name: '种族'
          }, {
            name: '卡牌类型'
          }, {
            name: '攻击力'
          }, {
            name: '生命值'
          }
        ],
        //用于清单的详细
        DetailsL: [
          {
            Career: [
              {
                name: '中立',
                id: 'neutral',
                value: 'Career'
              }, {
                name: '德鲁伊',
                id: 'Druid',
                value: 'Career'
              }, {
                name: '猎人',
                id: 'hunter',
                value: 'Career'
              }, {
                name: '法师',
                id: 'Master',
                value: 'Career'
              }, {
                name: '圣骑士',
                id: 'Paladin',
                value: 'Career'
              }, {
                name: '牧师',
                id: 'Priest',
                value: 'Career'
              }, {
                name: '潜行者',
                id: 'Lurking',
                value: 'Career'
              }, {
                name: '术士',
                id: 'Warlock',
                value: 'Career'
              }, {
                name: '战士',
                id: 'warrior',
                value: 'Career'
              }, {
                name: '萨满祭司',
                id: 'Shaman',
                value: 'Career'
              },
            ],
            Mana: [
              {
                name: '0',
                id: 'Mana0',
                value: 'Mana'
              }, {
                name: '1',
                id: 'Mana1',
                value: 'Mana'
              }, {
                name: '2',
                id: 'Mana2',
                value: 'Mana'
              }, {
                name: '3',
                id: 'Mana3',
                value: 'Mana'
              }, {
                name: '4',
                id: 'Mana4',
                value: 'Mana'
              }, {
                name: '5',
                id: 'Mana5',
                value: 'Mana'
              }, {
                name: '6',
                id: 'Mana6',
                value: 'Mana'
              }, {
                name: '7',
                id: 'Mana7',
                value: 'Mana'
              }, {
                name: '8',
                id: 'Mana8',
                value: 'Mana'
              }, {
                name: '9+',
                id: 'Mana9',
                value: 'Mana'
              },
            ],
            rarity: [
              {
                name: '普通',
                id: 'ordinary',
                value: 'rarity'
              }, {
                name: '免费',
                id: 'FREE',
                value: 'rarity'
              }, {
                name: '稀有',
                id: 'rare',
                value: 'rarity'
              }, {
                name: '史诗',
                id: 'epic',
                value: 'rarity'
              }, {
                name: '传说',
                id: 'legend',
                value: 'rarity'
              },
            ],
            race: [
              {
                name: '鱼人',
                id: 'Fishman',
                value: 'race'
              }, {
                name: '恶魔',
                id: 'demon',
                value: 'race'
              }, {
                name: '野兽',
                id: 'beast',
                value: 'race'
              }, {
                name: '图腾',
                id: 'totem',
                value: 'race'
              }, {
                name: '海盗',
                id: 'pirate',
                value: 'race'
              }, {
                name: '龙',
                id: 'Dragon',
                value: 'race'
              }, {
                name: '机械',
                id: 'mechanical',
                value: 'race'
              }, {
                name: '元素',
                id: 'element',
                value: 'race'
              },
            ],
            CardType: [
              {
                name: '法术',
                id: 'Spells',
                value: 'CardType'
              }, {
                name: '随从',
                id: 'Followers',
                value: 'CardType'
              }, {
                name: '装备',
                id: 'equipment',
                value: 'CardType'
              },
            ],
            AttackPower: [
              {
                name: '0',
                id: 'AttackPower0',
                value: 'AttackPower'
              }, {
                name: '1',
                id: 'AttackPower1',
                value: 'AttackPower'
              }, {
                name: '2',
                id: 'AttackPower2',
                value: 'AttackPower'
              }, {
                name: '3',
                id: 'AttackPower3',
                value: 'AttackPower'
              }, {
                name: '4',
                id: 'AttackPower4',
                value: 'AttackPower'
              }, {
                name: '5',
                id: 'AttackPower5',
                value: 'AttackPower'
              }, {
                name: '6',
                id: 'AttackPower6',
                value: 'AttackPower'
              }, {
                name: '7+',
                id: 'AttackPower7',
                value: 'AttackPower'
              },
            ],
            LifeValue: [
              {
                name: '0',
                id: 'LifeValue0',
                value: 'LifeValue'
              }, {
                name: '1',
                id: 'LifeValue1',
                value: 'LifeValue'
              }, {
                name: '2',
                id: 'LifeValue2',
                value: 'LifeValue'
              }, {
                name: '3',
                id: 'LifeValue3',
                value: 'LifeValue'
              }, {
                name: '4',
                id: 'LifeValue4',
                value: 'LifeValue'
              }, {
                name: '5',
                id: 'LifeValue5',
                value: 'LifeValue'
              }, {
                name: '6',
                id: 'LifeValue6',
                value: 'LifeValue'
              }, {
                name: '7+',
                id: 'LifeValue7',
                value: 'LifeValue'
              },
            ],
          }
        ],
        //用于接受数据。在传送给后端。 筛选页面的
        oCareer: '',
        oMana: '',
        orarity: '',
        orace: '',
        oCardType: '',
        oAttackPower: '',
        oLifeValue: '',
        //筛选那个黄色条出现不出现
        titleShow: 0,
        //卡组选择
        details: false,
        //卡组选择的包装成
        detailsWrapper: false,
        //筛选页面
        filter: false,
        //筛选页面的外层
        filterWrapper: false,
        //单卡详情页
        singleCard: false,
        //收藏卡片详情
        List: false,
        //搜索弹出框
        cardSearch: false,
        //接收卡片内容
        items: [],

        //给收藏列表传数组
        scitems: [],
        //底部滚动需要判断的数据
        loading: false,
        skipCount: 10,
        //用于接受卡片的数量
        totalCount: '',
        //筛选黄色的显示和隐藏
        filterBg: false,
        //接受卡组筛选后的底部滚动
        cardSetons: null,
        //用于接收搜索输入框的值
        sshuoCardName: '',
        //用于input的值的关联
        sshuoCardNameons: '',
        //用于传送给子组件的localStorage
        searchHistoryName: {},
        //用于接收收藏卡片的总数totalCount
        totalCountSC: '',
        //判断爱心里面的+号
        aixinjiahao: false,
        //判断+号后面的背景
        redbg: false,
        //点击后传一个清单给卡片详情.接收
        CardedDetails: {},
        //用于判断右上角的筛选黄色
        yellowScreen: false,
        //用于判断三角形的显示和隐藏
        sanjiaochenge: false,
        //没有找到东西后的显示
        NotFound: false,
      }
    },
    mounted() {
      this.GetTheCardList();
      this.GetNumberFavorites();
      this.StoredInLocalData();
      this.ReadStoredData();
    },
    methods: {
      //用于主页面的返回
      RotateBack(e) {
        if (this.cardSearch) {
          this.cardSearch = false
        } else {
          this.$router.push({path: '/tools/'});
        }
        this.$store.state.global.footerhide = false;

      },
      //弹出搜索历史页面
      SearchHistory() {
        this.cardSearch = true
      },
      //点击后传一个清单给卡片详情
      DetailsShow(id) {
        this.$router.push({name: 'singleCardDetails', params: {carId: id + '.html'}})
      },


      //收藏的显示和隐藏
      shouCClick(index, item) {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          if (item.isCollection === false) {
            api.CollectHearthstoneCard({
              cardId: item.cardId
            }).then(
              res => {
                item.isCollection = !item.isCollection
                this.GetNumberFavorites();
              }, err => {
                $.toast(err)
              }
            )
          } else {
            api.DeleteCollectHearthstoneCard({
              cardId: item.cardId
            }).then(
              res => {
                item.isCollection = !item.isCollection
                this.GetNumberFavorites();
              }, err => {
                $.toast(err)
              }
            )
          }
        }

      },

      //用于筛选分类数据判断
      btn(name, value) {
        this.skipCount = 10;
        this.cardSetons = '';
        this.sshuoCardName = '';
        this.totalCount = '';
        this.details = false;
        this.detailsWrapper = false;
        this.$refs.taokaName.innerHTML = '所属卡牌集'
        this.$refs.taokaName.style.color = '#fff'
        this.sanjiaochenge = false;
        if (value === 'Career') {
          this.oCareer = name;
          console.log(this.oCareer)
        }
        if (value === 'Mana') {
          this.oMana = name
          console.log(this.oMana)
        }
        if (value === 'rarity') {
          this.orarity = name
          console.log(this.orarity)
        }
        if (value === 'race') {
          this.orace = name
          console.log(this.orace)
        }
        if (value === 'CardType') {
          this.oCardType = name
          console.log(this.oCardType)
        }
        if (value === 'AttackPower') {
          this.oAttackPower = name
          console.log(this.oAttackPower)
        }
        if (value === 'LifeValue') {
          this.oLifeValue = name
          console.log(this.oLifeValue)
        }
        this.yellowScreen = true
        api.CheckHearthstoneCard({
          maxResultCount: 10,
          skipCount: 0,
          class: this.oCareer,
          cost: this.oMana,
          rarity: this.orarity,
          race: this.orace,
          cardType: this.oCardType,
          atk: this.oAttackPower,
          health: this.oLifeValue,
        }).then(
          res => {
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            console.log(this.items)
            this.details = false;
            this.detailsWrapper = false;
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      //退出筛选页面
      sure() {
        this.filter = false;
        this.filterWrapper = false;
      },


      //用于筛选清单的转换。
      listShow(index) {
        let aa = this.$refs.contentRight;
        let bb = $(aa).children('div');
        for (let i = 0; i < bb.length; i++) {
          bb[i].style.display = 'none';
        }
        bb[index].style.display = 'block';
      },


      //获取卡片列表
      GetTheCardList() {
        api.CheckHearthstoneCard({maxResultCount: 10, skipCount: 0}).then(
          res => {
            console.log(res)
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
          },
          err => {
            $.toast(err);
          }
        )
      },


      //底部滚动
      fetchData() {
        if (this.items.length === 0) {
          return
        }
        this.loading = true;
        api.CheckHearthstoneCard({
          maxResultCount: 10,
          skipCount: this.skipCount,
          cardSet: this.cardSetons,
          name: this.sshuoCardName,
          class: this.oCareer,
          cost: this.oMana,
          rarity: this.orarity,
          race: this.orace,
          cardType: this.oCardType,
          atk: this.oAttackPower,
          health: this.oLifeValue,
        }).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              this.items.push(res.data.result.items[i]);
            }
            if (this.skipCount > this.totalCount) {
              this.$refs.scrollShow.style.display = 'none';
              return false
            }
          },
          err => {
            $.toast(err)
          }
        );
//        用于判断总数 小于总数后不进行刷新

        this.skipCount += 10;
        this.loading = false
      },


      //卡牌集的显示和隐藏
      cardSet() {
        if (!this.sanjiaochenge) {
          if (!this.detailsWrapper) {
            this.detailsWrapper = true;
            this.details = true;
            this.$refs.triangleRotation.style.transform = 'rotate(180deg)';
          } else {
            this.detailsWrapper = false;
            this.details = false;
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
          }
        } else {
          if (!this.detailsWrapper) {
            this.detailsWrapper = true;
            this.details = true;
            this.$refs.triangleRotationHaa.style.transform = 'rotate(180deg)';
          } else {
            this.detailsWrapper = false;
            this.details = false;
            this.$refs.triangleRotationHaa.style.transform = 'rotate(0)';
          }
        }

      },
      //卡牌集的显示和隐藏
      cardSetWrapper() {
        if (!this.detailsWrapper) {
          this.detailsWrapper = true;
          this.details = true;
        } else {
          this.detailsWrapper = false;
          this.details = false;
        }
      },
      //筛选页面的显示和隐藏
      filterShow() {
        if (!this.filter) {
          this.filter = true;
          this.filterWrapper = true;
        } else {
          this.filter = false;
          this.filterWrapper = false
        }
      },
      //筛选页面的显示和隐藏
      filterWrapperShow() {
        if (!this.filter) {
          this.filter = true;
          this.filterWrapper = true
        } else {
          this.filter = false;
          this.filterWrapper = false
        }
      },
      //筛选页面的显示和隐藏..黄色筛选
      filterBgShow() {
        if (!this.filter) {
          this.filter = true;
          this.filterWrapper = true
        }
      },


      //套卡的筛选
      yqagl() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '勇闯安戈洛'
        }).then(
          res => {
            this.sanjiaochenge = true;
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '勇闯安戈洛'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '勇闯安戈洛'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )
      },
      lzhdjsj() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '龙争虎斗加基森'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '龙争虎斗加基森'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '龙争虎斗加基森'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      klzzy() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '卡拉赞之夜'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '卡拉赞之夜'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '卡拉赞之夜'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      sgzsddy() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '上古之神的低语'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '上古之神的低语'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '上古之神的低语'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      txzxh() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '探险者协会'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '探险者协会'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '探险者协会'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      gjdsl() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '冠军的试炼'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '冠军的试炼'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '冠军的试炼'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      hssdhy() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '黑石山的火焰'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '黑石山的火焰'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '黑石山的火焰'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      djdzzr() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '地精大战侏儒'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '地精大战侏儒'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '地精大战侏儒'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      nksms() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '纳克萨玛斯'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '纳克萨玛斯'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '纳克萨玛斯'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      jbxl() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '基本'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '基本'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '基本系列'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';
          }, err => {
            $.toast(err)
          }
        )

      },
      jdxl() {
        this.ClearTheFilterData();
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          cardSet: '经典'
        }).then(
          res => {
            this.sanjiaochenge = true
            this.$refs.triangleRotation.style.transform = 'rotate(0)';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.cardSetons = '经典'
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '经典系列'
            this.$refs.taokaName.style.color = '#fba601'
            this.$refs.scrollShow.style.display = 'inline-block';

          }, err => {
            $.toast(err)
          }
        )

      },
      //用于接收子组件的值
      CardnameaChenge() {
        let zz = this.sshuoCardNameons;
        this.cardSearch = false
        this.ClearTheFilterData();
        this.sshuoCardName = zz;
        api.CheckHearthstoneCard({
          maxResultCount: 10, skipCount: 0,
          name: this.sshuoCardName
        }).then(
          res => {
            this.StoredInLocalData();
            this.ReadStoredData();
            this.totalCount = '';
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.details = false;
            this.detailsWrapper = false;
            this.cardSearch = false;
            this.$refs.scrollContainer.scrollTop = 0
            this.$refs.taokaName.innerHTML = '所属卡牌集'
            this.$refs.taokaName.style.color = '#fff'
            if (this.totalCount <= 10) {
              this.$refs.scrollShow.style.display = 'none';
            } else {
              this.$refs.scrollShow.style.display = 'inline-block';
            }
            this.skipCount = 10;
            if (this.items.length === 0) {
              this.NotFound = true
            } else {
              this.NotFound = false
            }

          }, err => {
            $.toast(err)
          }
        )

      },


      //用于获取收藏卡片的总数
      GetNumberFavorites() {
        if (!checkJs.getCookie('token')) {
          return
        } else {
          api.GetCollectHearthstoneCard({
            maxResultCount: 10,
            skipCount: 0,
          }).then(
            res => {
              this.scitems = res.data.result.items;
              this.totalCountSC = res.data.result.totalCount;
              if (this.totalCountSC > 99) {
                this.totalCountSC = '99';
                this.aixinjiahao = true
              } else {
                this.totalCountSC = res.data.result.totalCount;
                this.aixinjiahao = false
              }
              if (this.totalCountSC === 0) {
                this.redbg = false;
              } else {
                this.redbg = true;
              }

            }, err => {
              $.toast(err)
            }
          )
        }

      },


      //显示卡牌清单  收藏列表
      collectionListShow() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({path: '/tools/HSCards/collectionList/'})
        }
      },


      //公用清除一些参数
      ClearTheFilterData() {
        this.skipCount = 10;
        this.cardSetons = '';
        this.sshuoCardName = '';
        this.totalCount = '';
        this.oCareer = '';
        this.oMana = '';
        this.orarity = '';
        this.orace = '';
        this.oCardType = '';
        this.oAttackPower = '';
        this.oLifeValue = '';
        this.details = false;
        this.detailsWrapper = false;
        this.yellowScreen = false;
        this.sanjiaochenge = false;
        let cc = this.$refs.Unchecked;
        let bb = $(cc).children('div');
        for (let i = 0; i < bb.length; i++) {
          let dd = $(bb).children('input');
          for (let j = 0; j < dd.length; j++) {
            dd[j].checked = false;
          }
        }

      },
      //用于清空在筛选时的数据重复。
      Reset() {
        this.ClearTheFilterData();
        let cc = this.$refs.Unchecked;
        let bb = $(cc).children('div');
        this.$refs.taokaName.style.color = '#fff'
        for (let i = 0; i < bb.length; i++) {
          let dd = $(bb).children('input');
          for (let j = 0; j < dd.length; j++) {
            dd[j].checked = false;
          }
        }
        this.sanjiaochenge = false;
        this.GetTheCardList();


      },
      //搜素后的字符 存到 localStorage
      StoredInLocalData() {
        let keyword = this.sshuoCardName
        keyword = keyword.trim();
        if (keyword === '') {
          return
        }
        let {historyItems} = localStorage;
        if (historyItems === undefined) {
          localStorage.historyItems = keyword;
        } else {
          const onlyItem = historyItems.split('|').filter(e => e !== keyword);
          if (onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.join('|');
          localStorage.historyItems = historyItems;
        }
      },
      //用于把localStorage值存到一个值，然后传回到子组件里面。
      ReadStoredData() {
        if (!localStorage.getItem("historyItems")) {
          return
        }
        let aa = localStorage.getItem("historyItems");
        aa = aa.replace(/\s+/g, "");
        this.searchHistoryName = aa.split('|');
        this.searchHistoryName = this.searchHistoryName.slice(0, 10);
      },
      //删除本地localStorage数据
      DeleteStoredData() {
        localStorage.removeItem('historyItems');
        this.searchHistoryName = {};
        this.sshuoCardNameons = '';
        this.CardnameaChenge();

      },
      //用于搜素历史点击
      AcceptLocalDataClick(item) {
        this.sshuoCardNameons = item;
        this.CardnameaChenge();
      },
      //用于热门搜素点击
      HotSearchClick(item) {
        this.sshuoCardNameons = item;
        this.CardnameaChenge();
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import 'cardInquiries';
</style>
