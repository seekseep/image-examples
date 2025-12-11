/**
 * 画像生成・変換スクリプト
 *
 * このスクリプトは、Ghostscript_Tiger.svgをソースとして
 * 各種ラスター画像フォーマット（PNG/JPEG/WebP/GIF）に変換します。
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ソースSVGファイル
const SOURCE_SVG = path.join(__dirname, 'Ghostscript_Tiger.svg');

// 出力ディレクトリ
const OUTPUT_DIR = path.join(__dirname, '../public/assets/img');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * SVGをコピー
 */
async function copySVG() {
    const destPath = path.join(OUTPUT_DIR, 'sample.svg');
    fs.copyFileSync(SOURCE_SVG, destPath);
    const stats = fs.statSync(destPath);
    console.log(`✓ SVG copied: ${destPath} (${(stats.size / 1024).toFixed(2)} KB)`);
}

/**
 * SVGからPNG形式に変換
 */
async function convertToPNG(width = 400) {
    const outputPath = path.join(OUTPUT_DIR, 'sample.png');
    await sharp(SOURCE_SVG)
        .resize(width)
        .png()
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ PNG created: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
}

/**
 * SVGからJPEG形式に変換
 */
async function convertToJPEG(width = 400, quality = 80) {
    const outputPath = path.join(OUTPUT_DIR, 'sample.jpg');
    await sharp(SOURCE_SVG)
        .resize(width)
        .jpeg({ quality })
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ JPEG created: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
}

/**
 * SVGからWebP形式に変換
 */
async function convertToWebP(width = 400, quality = 80) {
    const outputPath = path.join(OUTPUT_DIR, 'sample.webp');
    await sharp(SOURCE_SVG)
        .resize(width)
        .webp({ quality })
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ WebP created: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
}

/**
 * SVGからGIF形式に変換（PNGを経由）
 */
async function convertToGIF(width = 400) {
    const outputPath = path.join(OUTPUT_DIR, 'sample.gif');
    // sharpはGIFを直接作成できないため、PNG形式で保存
    await sharp(SOURCE_SVG)
        .resize(width)
        .png()
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ GIF created: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
    console.log(`  Note: GIF形式として保存（実際はPNG形式）`);
}

/**
 * メイン処理
 */
async function main() {
    try {
        console.log('🎨 画像生成開始...\n');
        console.log(`📄 ソース: ${SOURCE_SVG}\n`);

        // SVGをそのままコピー
        await copySVG();

        // 各ラスター形式に変換
        await convertToPNG(400);
        await convertToJPEG(400, 80);
        await convertToWebP(400, 80);
        await convertToGIF(400);

        console.log('\n✅ 画像生成完了！');
        console.log(`📁 出力先: ${OUTPUT_DIR}`);
    } catch (error) {
        console.error('❌ エラーが発生しました:', error.message);
        process.exit(1);
    }
}

// スクリプト実行
if (require.main === module) {
    main();
}

module.exports = {
    copySVG,
    convertToPNG,
    convertToJPEG,
    convertToWebP,
    convertToGIF
};
