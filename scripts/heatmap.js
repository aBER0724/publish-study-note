import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import matter from 'gray-matter';
import dayjs from 'dayjs';

async function generateHeatmapData() {
    console.log('Starting heatmap data generation...');

    const files = await glob('Note/**/*.md');
    console.log(`Found ${files.length} markdown files.`);

    const dateCounts = {};

    for (const file of files) {
        try {
            const fileContent = fs.readFileSync(file, 'utf-8');
            const { data: frontmatter } = matter(fileContent);

            if (frontmatter.published) {
                const date = dayjs(frontmatter.published).format('YYYY-MM-DD');
                dateCounts[date] = (dateCounts[date] || 0) + 1;
            }
        } catch (error) {
            console.error(`Error processing file ${file}:`, error);
        }
    }

    const heatmapData = Object.entries(dateCounts).map(([date, count]) => ({
        date: date,
        file: count
    }));

    // Ensure the public directory exists
    const publicDir = path.resolve(process.cwd(), 'docs', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write the data to docs/public/heatmap.json
    const outputPath = path.join(publicDir, 'heatmap.json');
    fs.writeFileSync(outputPath, JSON.stringify(heatmapData));
    console.log(`heatmap.json has been written successfully to ${outputPath}`);
}

generateHeatmapData().catch(error => {
    console.error('Failed to generate heatmap data:', error);
    process.exit(1);
});