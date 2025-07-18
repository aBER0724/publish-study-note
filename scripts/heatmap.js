import fs from 'fs';
import glob from 'fast-glob';
import matter from 'gray-matter';
import dayjs from 'dayjs';

async function generateHeatmapData() {
    console.log('Starting heatmap data generation by reading file metadata...');

    // Find all markdown files in the 'Note' directory
    const files = await glob('Note/**/*.md');
    console.log(`Found ${files.length} markdown files:`, files);

    const dateCounts = {};

    for (const file of files) {
        try {
            console.log(`--- Processing file: ${file} ---`);
            const fileContent = fs.readFileSync(file, 'utf-8');
            const { data: frontmatter } = matter(fileContent);

            // Check for 'published' in frontmatter
            if (frontmatter.published) {
                const date = dayjs(frontmatter.published).format('YYYY-MM-DD');
                console.log(`Found published date: ${frontmatter.published}, formatted to: ${date}`);
                dateCounts[date] = (dateCounts[date] || 0) + 1;
            } else {
                console.log('No "published" date found in frontmatter.');
            }
        } catch (error) {
            console.error(`Error processing file ${file}:`, error);
        }
    }

    console.log('--- Aggregated date counts ---');
    console.log(JSON.stringify(dateCounts, null, 2));
    console.log('--- End Aggregated date counts ---');

    // Convert the aggregated data to the format required by CalHeatmap
    const heatmapData = Object.entries(dateCounts).map(([date, count]) => ({
        date: date,
        file: count
    }));

    console.log('Final heatmap data:', JSON.stringify(heatmapData, null, 2));

    // Write the data to heatmap.json
    fs.writeFileSync('heatmap.json', JSON.stringify(heatmapData));
    console.log('heatmap.json has been written successfully.');
}

generateHeatmapData().catch(error => {
    console.error('Failed to generate heatmap data:', error);
    process.exit(1);
});