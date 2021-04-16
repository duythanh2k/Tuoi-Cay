function hihi (){
    if (kiemtra()){
        window.alert("hãy nhập lại đúng input");
        return false;
    }
    var tt = document.getElementById("thoitiet").value;
    var da = document.getElementById("doam").value;
    var nc = document.getElementById("nuoc").value;
    var out = -1;
    var tt1;
    var da1;
    var nc1;
    

    var luat = -1;

    // mờ hóa thời tiết
    if(tt < 0.33){
        tt1 = "mua";
    }
    else if(tt < 0.66){
        tt1 = "ram";
    }
    else{
        tt1 = "nang";
    }

    // mờ hóa độ ẩm đất
    if(da < 30){
        da1 = "thap";
    }
    else if(da < 60){
        da1 = "vua";
    }
    else {
        da1 = "cao";
    }

    //mờ hóa lượng nước trong hồ
    if(nc < 125){
        nc1 = "can";
    }
    else if(nc < 250){
        nc1 = "it";
    }
    else if(nc < 375){
        nc1 = "lung";
    }
    else{
        nc1 = "day";
    }
 ///////////////////////////////////////////////////////////////////////////////////////////////////
    // lựa chọn luật theo tập luật có sẵn
    if(tt1 == "mua"){
        luat = 0;
    }
    else if (tt1 = "ram"){
        // xu ly ram
        if(da1 == "thap"){
            //xuly nuoc trong ho
            if(nc1 == "can"){
                luat = 20;
            }
            else if(nc1 == "it"){
                luat = 17;
            }
            else if ( nc1 == "lung"){
                luat = 12;
            }
            else{
                luat = 6;
            }
        }
        else if(da1 == "vua"){
            //xuly nuoc trong ho
            if(nc1 == "can"){
                luat = 0;
            }
            else if(nc1 == "it"){
                luat = 15;
            }
            else if ( nc1 == "lung"){
                luat = 10;
            }
            else{
                luat = 4;
            }
        }
        else{
            //xuly nuoc trong ho
            if(nc1 == "can"){
                luat = 0;
            }
            else if(nc1 == "it"){
                luat = 0;
            }
            else if ( nc1 == "lung"){
                luat = 8;
            }
            else{
                luat = 2;
            }
        }
    }
    else{
        //xu ly nang
        if(da1 == "thap"){
            //xuly nuoc trong ho
            if(nc1 == "can"){
                luat = 19;
            }
            else if(nc1 == "it"){
                luat = 16;
            }
            else if ( nc1 == "lung"){
                luat = 11;
            }
            else{
                luat = 5;
            }
        }
        else if(da1 == "vua"){
            //xuly nuoc trong ho
            if(nc1 == "can"){
                luat = 18;
            }
            else if(nc1 == "it"){
                luat = 14;
            }
            else if ( nc1 == "lung"){
                luat = 9;
            }
            else{
                luat = 3;
            }
        }
        else{
            //xuly nuoc trong ho
            if(nc1 == "can"){
                luat = 0;
            }
            else if(nc1 == "it"){
                luat = 13;
            }
            else if ( nc1 == "lung"){
                luat = 7;
            }
            else{
                luat = 1;
            }
        }
    }
    // chọn luật xong

    


    // xu ly tinh toan------------------------------------------------------------------------------------------------------------
    var m_day = nc/500;
    var m_lung;
    if(nc<200){
        m_lung = nc/200;
    }
    else{
        m_lung = (500-nc)/200;
    }

    var m_can = (500-nc)/500;

    var am_cao = da/90;
    var am_vua;
    if(da<45){
        am_vua = da/45;
    }
    else{
        am_vua = (90-da)/45;
    }
    var am_thap =(90-da)/90;
    var m_nang = tt;
    var m_ram;
    if(tt<0.5){
        m_ram = 2*tt;
    }
    else{
        m_ram = (-2*tt)+2;
    }
    

    var w;
    if ( luat == 0){
        out = 0;
        
    }
    else if(luat == 1){
        w = min(m_day,am_cao,m_nang);
        out = tuoinhieu(w);
    }
    else if(luat == 2){
        w = min(m_day,am_cao,m_ram);
        out = tuoivua(w);
    }
    else if(luat == 3){
        w = min(m_day,am_vua,m_ram);
        out = tuoinhieu(w);
    }
    else if(luat == 4){
        w = min(m_day,am_vua,m_ram);
        out = tuoinhieu(w);
    }
    else if(luat == 5){
        w = min(m_day,am_thap,m_nang);
        out = tuoiratnhieu(w);
    }
    else if(luat == 6){
        w = min(m_day,am_thap,m_ram);
        out = tuoiratnhieu(w);
    }
    else if(luat == 7){
        w = min(m_lung,am_cao,m_nang);
        out = tuoinhieu(w);
    }
    else if(luat == 8){
        w = min(m_lung,am_cao,m_ram);
        out = tuoiit(w);
    }
    else if(luat == 9){
        w = min(m_lung,am_vua,m_nang);
        out = tuoinhieu(w);
    }
    else if(luat == 10){
        w = min(m_lung,am_vua,m_nang);
        out = tuoivua(w);
    }
    else if(luat == 11){
        w = min(m_lung,am_thap,m_nang);
        out = tuoiratnhieu(w);
    }
    else if(luat == 12){
        w = min(m_lung,am_thap,m_ram);
        out = tuoinhieu(w);
    }
    else if(luat == 13){
        w = min(m_it,am_cao,m_ram);
        out = tuoiit(w);
    }
    else if(luat == 14){
        w = min(m_it,am_cao,m_ram);
        out = tuoivua(w);
    }
    else if(luat == 15){
        w = min(m_it,am_vua,m_ram);
        out = tuoiit(w);
    }
    else if(luat == 16){
        w = min(m_it,am_thap,m_nang);
        out = tuoivua(w);
    }
    else if(luat == 17){
        w = min(m_it,am_thap,m_nang);
        out = tuoiit(w);
    }
    else if(luat == 18){
        w = min(m_can,am_thap,m_nang);
        out = tuoiit(w);
    }
    else if(luat == 19){
        w = min(m_can,am_thap,m_nang);
        out = tuoiit(w);
    }
    else if(luat == 20) {
        w = min(m_can,am_thap,m_ram);
        out = tuoiit(w);
    }
    
    
    document.getElementById("ouut").value =out;
}



function kiemtra(){
    var tt = document.getElementById("thoitiet").value;
    var da = document.getElementById("doam").value;
    var nc = document.getElementById("nuoc").value;

    if (tt > 1 || tt < 0 || da < 0 || da > 95 || nc < 0 || nc > 500){
        
        return true;
    }
    return false;
}

// đồng bộ hóa dữ liệu giữa ô text và range
function changettk(a){
    document.getElementById("thoitiet1").value = a.value;
}
function changettv(a){
    document.getElementById("thoitiet").value = a.value;
}

function changedak(a){
    document.getElementById("doam").value = a.value;
}
function changedav(a){
    document.getElementById("doam1").value = a.value;
}

function changenck(a){
    document.getElementById("nuoc").value = a.value;
}
function changencv(a){
    document.getElementById("nuoc1").value = a.value;
}

// xây dựng hàm xử lý 4 trường hợp output

function tuoiratnhieu(w){
    var m1 = w*3000;
    var a = m1;
    var m2 = 3000;
    var b = 0;
    var h = w;
    var ts = (h/6)*(3*m2*m2 - 3*m1*m1 + b*b - a*a + 3*m2*b + 3*m1*a);
    var ms = (h/2)*(2*m2 - 2*m1 + a + b);
    return ts/ms; 
}

function tuoinhieu(w){
    var h = w;
    var m1 = w*2000;
    var a = m1;
    var m2 = 3000-(w*2000);
    var b = 3000-m2;
    var ts = (h/6)*(3*m2*m2 - 3*m1*m1 + b*b - a*a + 3*m2*b + 3*m1*a);
    var ms = (h/2)*(2*m2 - 2*m1 + a + b);
    return ts/ms; 
}

function tuoivua(w){
    var h = w;
    var m1 = 1000*w;
    var a = m1;
    var m2 = 3000-(1000*w);
    var b = 3000-m2;
    var ts = (h/6)*(3*m2*m2 - 3*m1*m1 + b*b - a*a + 3*m2*b + 3*m1*a);
    var ms = (h/2)*(2*m2 - 2*m1 + a + b);
    return ts/ms; 
}

function tuoiit(w){
    var h = w;
    var m1 = 0;
    var a =0;
    var m2 = 3000 - (3000*w);
    var b = 3000 - m2;
    var ts = (h/6)*(3*m2*m2 - 3*m1*m1 + b*b - a*a + 3*m2*b + 3*m1*a);
    var ms = (h/2)*(2*m2 - 2*m1 + a + b);
    return ts/ms; 
}

// code hàm min
function min(a,b,c){
    if(a<=b&&a<=c){
        return a;
    }
    if(b<=a&&b<=c){
        return b;
    }
    if(c<=a&&c<=b){
        return c;
    }
}
