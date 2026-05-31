import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directoryPath = path.dirname(fileURLToPath(import.meta.url));

// Get all html files
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

const footerHTML = `    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand reveal">
                    <img src="/logo.png" alt="465" class="footer-logo-img">
                    <p style="margin-bottom: 24px;">Uluslararası fikri mülkiyet koruma ve dijital eser tescil kurumu. Yaratıcı üretimleri kriptografik altyapı ile küresel hukuk çerçevesinde kalıcı olarak güvence altına alır.</p>
                    <p style="font-weight: 500; color: var(--text);">Resmi İletişim:</p>
                    <p style="margin-bottom: 8px;">465legalrights@gmail.com</p>
                </div>
                <div class="footer-links reveal" style="transition-delay:.1s">
                    <h5>Kurumsal</h5>
                    <ul>
                        <li><a href="/kurum.html">Platform Hakkında</a></li>
                        <li><a href="/hizmetler.html">Hizmet Kapsamı</a></li>
                        <li><a href="/surec.html">Tescil Süreci</a></li>
                        <li><a href="/iletisim.html">Genel Müdürlük</a></li>
                    </ul>
                </div>
                <div class="footer-links reveal" style="transition-delay:.2s">
                    <h5>Hizmetler</h5>
                    <ul>
                        <li><a href="/tescil.html">Dijital Eser Tescili</a></li>
                        <li><a href="/cozum-yazilim.html">Kaynak Kod Koruması</a></li>
                        <li><a href="/cozum-muzik.html">Akustik Parmak İzi</a></li>
                        <li><a href="/cozum-dijital.html">Otonom DRM Ağı</a></li>
                    </ul>
                </div>
                <div class="footer-links reveal" style="transition-delay:.3s">
                    <h5>Hukuki Kaynaklar</h5>
                    <ul>
                        <li><a href="/mevzuat.html">5846 FSEK Kanunu</a></li>
                        <li><a href="/mevzuat.html">Bern Sözleşmesi</a></li>
                        <li><a href="/rehber-eser.html">Eser Sahipliği Rehberi</a></li>
                        <li><a href="/sss.html">Sıkça Sorulan Sorular</a></li>
                        <li><a href="/privacy.html">Gizlilik Politikası</a></li>
                        <li><a href="/legal.html">Yasal Bildirim</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <span class="footer-copy">© 2026 465 Legal Rights. All Rights Reserved.</span>
                <div class="footer-bottom-links">
                    <a href="/privacy.html">Privacy Policy</a>
                    <a href="/legal.html">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(directoryPath, file), 'utf8');

    // Replace footer completely
    content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/g, footerHTML);

    // Make sure we have the Hamburger icon in the nav-inner
    if (!content.includes('class="nav-toggle"')) {
        content = content.replace(
            /<\/div>\s*<\/header>/g, 
            `    <button class="nav-toggle" aria-label="Menu" id="nav-toggle">
                    <span class="hamburger"></span>
                </button>
            </div>
        </header>

        <!-- Mobile Menu Overlay -->
        <nav class="mobile-menu" id="mobile-menu" aria-label="Mobil gezinme" aria-hidden="true">
            <div class="mobile-menu-inner">
                <ul>
                    <li><a href="/kurum.html">Kurum</a></li>
                    <li><a href="/hizmetler.html">Hizmetler</a></li>
                    <li><a href="/surec.html">Süreç</a></li>
                    <li><a href="/mevzuat.html">Mevzuat</a></li>
                    <li><a href="/sss.html">SSS</a></li>
                </ul>
                <a href="/tescil.html" class="btn mobile-cta">Tescil Başvurusu</a>
            </div>
        </nav>`
        );
    }

    fs.writeFileSync(path.join(directoryPath, file), content, 'utf8');
});

console.log('HTML files successfully updated via Node script.');
