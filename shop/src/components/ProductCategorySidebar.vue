<template>
  <div class="admin-product-catagory" align="left">
    <div class="text">Categories</div>
    <ul>
      <li v-for="category in categoryList" :key="category.id">
        <a href="#">{{category.name}}</a>
        <ul>
          <li v-for="(subCategory,index) in subCategoryList" :key="index">
            <a href="#" v-if="category.id == subCategory.cat_id">{{subCategory.name}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AdminProductCatagory",
  data() {
    return {
      categoryList: [
        {
          id: 1,
          name: "chair"
        },
        {
          id: 2,
          name: "book"
        },
        {
          id: 3,
          name: "laptop"
        },
      ],
      subCategoryList: [
        {
          id: 1,
          cat_id:1,
          name: "chair1"
        },
        {
          id:2,
          cat_id:1,
          name: "chair2"
        },
        {
          id: 3,
          cat_id:2,
          name: "book1"
        },
        {
          id: 4,
          cat_id:1,
          name: "chair3"
        },
        {
          id:5,
          cat_id:1,
          name: "chair4"
        },
        {
          id: 6,
          cat_id:2,
          name: "book2"
        },
        {
          id: 7,
          cat_id:3,
          name: "laptop1"
        },
        {
          id:8,
          cat_id:3,
          name: "laptop2"
        },
        {
          id: 9,
          cat_id:3,
          name: "laptop3"
        }
      ]
    }
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: Poppins, sans-serif;
}
.admin-product-catagory {
  height: 100%;
  left: 0;
  background: #1b1b1b;
  .text {
    color: white;
    font-size: 25px;
    font-weight: 600;
    line-height: 65px;
    text-align: center;
    background: #1e1e1e;
    letter-spacing: 1px;
  }
  ul {
    background: #1b1b1b;
    height: 100%;
    width: 100%;
    list-style: none;
    ul {
      position: static;
      li {
        position: relative;
        line-height: 42px;
        border-bottom: none;
        a {
          font-size: 17px;
          color: #e6e6e6;
          padding-left: 80px;
        }
      }
    }
    li {
      line-height: 60px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      a {
        position: relative;
        color: white;
        text-decoration: none;
        font-size: 18px;
        padding-left: 40px;
        font-weight: 500;
        display: block;
        width: 100%;
        border-left: 3px solid transparent;
        &:hover {
          color: cyan;
          background: #1e1e1e;
          border-left-color: cyan;
        }
      }
    }
  }
}

</style>
