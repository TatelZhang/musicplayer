<template>
  <div class="menu-container">
    <div class="header">
      
      <span>目录</span>
    </div>
    <div class="item on">
      <div class="icon">
        <i class="fa fa-search"></i>
      </div>
      <span>搜索</span>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fa fa-cc"></i>
      </div>
      <span>电台</span>
    </div>
    <div class="item">
      <div class="icon">
       <i class="fa fa-id-card"></i>
      </div>
      <span>专辑</span>
    </div>
    <div class="item">
      <div class="icon">
       <i class="fa fa-user"></i>
      </div>
      <span>歌手</span>
    </div>
  </div>
</template>
<script>
  
</script>
<style>
  .menu-container {
    margin-top: 80px; 
    /* padding: 10px 0; */
    /* border: 1px solid green; */
    font-size: 13px;
  }
  .menu-container .header {
    color: #b4bed0;
    font-weight: bold;
    margin-left: 20px;
  }
  .menu-container .item {
    position: relative;
    margin: 10px 0px;
    padding: 5px 20px;
    font-weight: bold;
    color: #b4bed0;
    cursor: pointer;
  }
  .menu-container .item:hover, .menu-container .item.on{
    color: #243d6f;
  }
  .menu-container .item.on::after {
    content: '';
    position: absolute;
    height: 25px;
    width: 3px;
    left: 0;
    top: 2.5px;
    background-color: #243d6f;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .item .icon {
    display: inline-block;
    width: 20px;
    text-align: center;
    margin-right: 5px;
  }
</style>
