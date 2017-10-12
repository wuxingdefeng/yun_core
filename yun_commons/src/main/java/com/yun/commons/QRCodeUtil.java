package com.yun.commons;

import com.google.zxing.*;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
/**
 * 二维码工具类
 */
public class QRCodeUtil {
    private static final String CHARSET = "utf-8";
    private static final String FORMAT_NAME = "JPG";
    // 二维码尺寸
    private static final int QRCODE_SIZE = 300;
    // LOGO宽度
    private static final int WIDTH = 60;
    // LOGO高度
    private static final int HEIGHT = 60;

    @SuppressWarnings({ "rawtypes", "unchecked" })
    private static BufferedImage createImage(String content, String imgPath,boolean needCompress) throws Exception {
        Hashtable hints = new Hashtable();
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        hints.put(EncodeHintType.CHARACTER_SET, CHARSET);
        hints.put(EncodeHintType.MARGIN, 1);
        BitMatrix bitMatrix = new MultiFormatWriter().encode(content,BarcodeFormat.QR_CODE, QRCODE_SIZE, QRCODE_SIZE, hints);
        int width = bitMatrix.getWidth();
        int height = bitMatrix.getHeight();
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                // Color color=new Color(255,105,188);
                //0xFF000000//黑色
                //修改二维码颜色和背景颜色
                image.setRGB(x, y, bitMatrix.get(x, y) ? QRCodeUtil.getMyColor("黑色"): 0xFFFFFFFF);
            }
        }
        if (imgPath == null || "".equals(imgPath)) {
            return image;
        }
        // 插入图片
        QRCodeUtil.insertImage(image, imgPath, needCompress);
        return image;
    }
    //获取颜色
    private static int getMyColor(String colors){
        Map<String,Object> mapColors=new HashMap<String,Object>();
        mapColors.put("黑色", 0xFF000000);
        mapColors.put("白色", 0xFFFFFFFF);
        mapColors.put("浅红色",new Color(255,182,193));
        return Integer.parseInt(mapColors.get(colors).toString());
    }


    private static void insertImage(BufferedImage source, String imgPath,
                                    boolean needCompress) throws Exception {
        File file = new File(imgPath);
        if (!file.exists()) {
            System.err.println(""+imgPath+"   该文件不存在！");
            return;
        }
        Image src = ImageIO.read(new File(imgPath));
        int width = src.getWidth(null);
        int height = src.getHeight(null);
        if (needCompress) { // 压缩LOGO
            if (width > WIDTH) {
                width = WIDTH;
            }
            if (height > HEIGHT) {
                height = HEIGHT;
            }
            Image image = src.getScaledInstance(width, height,Image.SCALE_SMOOTH);
            BufferedImage tag = new BufferedImage(width, height,BufferedImage.TYPE_INT_RGB);
            Graphics g = tag.getGraphics();
            g.drawImage(image, 0, 0, null); // 绘制缩小后的图
            g.dispose();
            src = image;
        }
        // 插入LOGO
        Graphics2D graph = source.createGraphics();
        int x = (QRCODE_SIZE - width) / 2;
        int y = (QRCODE_SIZE - height) / 2;
        graph.drawImage(src, x, y, width, height, null);
        Shape shape = new RoundRectangle2D.Float(x, y, width, width, 6, 6);
        graph.setStroke(new BasicStroke(3f));
        graph.draw(shape);
        graph.dispose();
    }


    public static void encode(String content, String imgPath, String destPath,boolean needCompress) throws Exception {
        BufferedImage image = QRCodeUtil.createImage(content, imgPath,needCompress);
        mkdirs(destPath);
        String file = System.currentTimeMillis()+".jpg";
        ImageIO.write(image, FORMAT_NAME, new File(destPath+"/"+file));
    }


    public static void mkdirs(String destPath) {
        File file =new File(destPath);
        //当文件夹不存在时，mkdirs会自动创建多层目录，区别于mkdir．(mkdir如果父目录不存在则会抛出异常)
        if (!file.exists() && !file.isDirectory()) {
            file.mkdirs();
        }
    }
    public static void encode(String content, String imgPath, String destPath)throws Exception {
        QRCodeUtil.encode(content, imgPath, destPath, false);
    }
    public static void encode(String content, String destPath,boolean needCompress) throws Exception {
        QRCodeUtil.encode(content, null, destPath, needCompress);
    }
    public static void encode(String content, String destPath) throws Exception {
        QRCodeUtil.encode(content, null, destPath, false);
    }
    public static void encode(String content, String imgPath,OutputStream output, boolean needCompress) throws Exception {
        BufferedImage image = QRCodeUtil.createImage(content, imgPath,needCompress);
        ImageIO.write(image, FORMAT_NAME, output);
    }
    public static void encode(String content, OutputStream output)throws Exception {
        QRCodeUtil.encode(content, null, output, false);
    }
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static String decode(File file) throws Exception {
        BufferedImage image;
        image = ImageIO.read(file);
        if (image == null) {
            return null;
        }
        BufferedImageLuminanceSource source = new BufferedImageLuminanceSource(image);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        Result result;
        Hashtable hints = new Hashtable();
        hints.put(DecodeHintType.CHARACTER_SET, CHARSET);
        result = new MultiFormatReader().decode(bitmap, hints);
        String resultStr = result.getText();
        return resultStr;
    }
    public static String decode(String path) throws Exception {
        return QRCodeUtil.decode(new File(path));
    }
    /**
     * 测试二维码生成
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        System.out.println(QRCodeUtil.decode(new File("d://TestDownAPK/show.png")));
        String text = "http://192.168.5.51:83/jiuzhekan_http/public/downAPP/1";
//        try{
//            /**
//            *params1 生成二维码内容
//            *params 2 生成二维码logo
//            *params 3 生成二维码路径
//            *params 4 是否压缩
//            **/
        QRCodeUtil.encode(text, "", "d://TestDownAPK", true);
//            System.out.println("二维码生成成功，请查看！！");
//        }catch(Exception e){
//            System.out.println("二维码生成失败，失败原因："+e.getMessage());
//        }
    }
}
