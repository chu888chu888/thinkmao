/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function changePrice(cart,flag){
    var str='';
    var num =$("#num").val();
    var id = $("#gid").val();
    $(".size li[as='true']").each(function(){
         var as =$(this).next('input').attr('value');
         str+=as+',';
    })
    str = str.slice(0,-1);
//    var num =str.split(',').length;
//    alert(num);
if(cart == true){
     var obj={
        id:id,
        attr:str,
        num:num,
        cart:1,
        flag:flag
    };
}else{
      var obj={
        id:id,
        attr:str,
        num:num,
        cart:0,
        flag:flag
    };
}

    $.ajax({
        type:"POST",
        url:url,
        data:obj,
        success:function(res){
            if(cart == true && flag==0){
                alert("增加一件商品");
                $("#total_price").text(res);
            }else if(cart == true && flag==1){
                eval("var url = "+res);
                location.href=url;
            }else{
           $("#total_price").text(res);
            }
        }
    })


}

$(function(){

    $('.go_car').click(function(){
        $.ajax({
            url:login_url,
            success:function(mes){
                   if(mes==1){
                         changePrice(true,0);
                   }else{
                       alert('请登陆！');
                       location.href=login;
                   }
            }
        })
    })


    $(".pay").click(function(){
           $.ajax({
            url:login_url,
            success:function(mes){
                   if(mes==1){
                         changePrice(true,1);
                   }else{
                       alert('请登陆！');
                       location.href=login;
                   }
            }
        })
    })









    $("#goods_mes").click(function(){
        $("#intro").css("display","block");
        $("#service").css("display","none");
    })

     $("#buyend").click(function(){
        $("#intro").css("display","none");
        $("#service").css("display","block");
    })





    var size_id;
    var color;
//    $(".s_p").click(function(){
//         $(".s_p").css("border","1px solid #E2E1E3");
//        $(this).css("border","2px solid #BB1C19");
//        color = $(this).children("input").val();
//
//        changePrice(size_id,color);
//    })
    $(".size li").click(function(){
        $(this).parent().children('li').css("border","1px solid #E2E1E3").attr("as",'false');;
        $(this).css("border","2px solid #BB1C19").attr("as",'true');

        changePrice(false,0);
    })

    $("#up").click(function(){
        var number = $("#num").val();
        $("#num").val(parseInt(number)+1);
        changePrice(false,0);
    })
    $("#down").click(function(){
        var number = $("#num").val();
        if(number>1){
            $("#num").val(parseInt(number)-1);
        }
        changePrice(false,0);
    })

})


