<?php
  class GoodAction extends Action{
      public function index(){
            if(empty($_GET['gid'])){
              redirect(U('Index/index'));
          }else{
          $gid = $_GET['gid'];
          $num = get_all_number($gid);
          $data = get_goods_mes($gid);
          $this->assign('gdata', $data);
          $this->assign("num",$num);
          $this->display("./Public/IndexTpl/top.html");
          $this->display("./Public/IndexTpl/test_good_guid.html");
      }
      }
      /**
       * 异步改变价格
       */
      public function ajaxx(){
          $gid = $_POST['id'];
          $num =$_POST['num'];
          $gdb = M('goods');
          $gdata = $gdb->where(array("id"=>$gid))->find();
          $price =$gdata['price']*$num;
          $attr = explode(',', $_POST['attr']);
          $db=M('goods_attr');
          $data = $db->where(array("gid"=>$gid))->select();
//          $price =0;
          foreach($data as $value){
              foreach ($attr as $v) {
                    if($v==$value['id']){
                        $price+=$value['price'];
                    }
              }
          }
          if($_POST['cart']==1){
              @session_start();
              $arr['gid']=$gid;
              $arr['num']=$num;
              $arr['attr']=$attr;
              $id = $_SESSION[id];
              $arr['id']=$id;

              $_SESSION["cart"][$id][]=serialize($arr);

          }
          if($_POST['flag']){
               echo json_encode(U('Order/index'));
          }else{
              echo json_encode($price);
          }

      }


      public function check_login(){
          @session_start();
          if($_SESSION[id]){
              echo 1;
          }else{
              echo 0;
          }
      }





  }

?>