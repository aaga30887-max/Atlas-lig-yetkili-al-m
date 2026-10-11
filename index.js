const {
  Client,
  Collection,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SectionBuilder,
  ThumbnailBuilder,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
const ayarlar = require('./ayarlar');
const sorular = require('./modules/sorular');

var V2_FLAGS = 32768;

var client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: ['CHANNEL'],
});

client.commands = new Collection();
var activeApplications = new Set();

var VERI_DOSYA = path.join(__dirname, 'veri.json');

client.veriYukle = function () {
  try {
    if (fs.existsSync(VERI_DOSYA)) {
      var v = JSON.parse(fs.readFileSync(VERI_DOSYA, 'utf8'));
      client.logChannelId = v.logChannelId || null;
      client.basvuruRoleId = v.basvuruRoleId || null;
      console.log('veri.json y\u00FCklendi. Log kanal\u0131: ' + (client.logChannelId || 'yok'));
    }
  } catch (error) {
    console.error('veri.json okunamad\u0131:', error.message);
  }
};

client.veriKaydet = function () {
  try {
    fs.writeFileSync(
      VERI_DOSYA,
      JSON.stringify({ logChannelId: client.logChannelId || null, basvuruRoleId: client.basvuruRoleId || null }, null, 2)
    );
  } catch (error) {
    console.error('veri.json yaz\u0131lamad\u0131:', error.message);
  }
};

client.veriYukle();

client.on('error', function (error) {
  console.error('Client hata olay\u0131:', error);
});
client.on('warn', function (info) {
  console.warn('Client uyar\u0131:', info);
});
process.on('unhandledRejection', function (error) {
  console.error('Yakalanmam\u0131 reddetme:', error);
});
process.on('uncaughtException', function (error) {
  console.error('Yakalanmam\u0131 istisna:', error);
});

var commandFiles = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter(function (file) { return file.endsWith('.js'); });

for (var i = 0; i < commandFiles.length; i++) {
  var file = commandFiles[i];
  var filePath = path.join(__dirname, 'commands', file);
  var command = require(filePath);
  client.commands.set(command.data.name, command);
}

var ICON = {
  hata: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  soru: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  ilerleme: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  kalem: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  kullanici: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  form: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  bilgi: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  kabul: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  red: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  oneri: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  zaman: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  hosgeldin: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
  onemli: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140824033136702/65023-lightning.gif?ex=6abf57ac&is=6abe062c&hm=eeb056fc576100311f14e0158e229b2a02743ca9dce61b6abc73a82e21c69be5&',
};

function sep() { return new SeparatorBuilder().setSpacing(1).setDivider(true); }
function sepBig() { return new SeparatorBuilder().setSpacing(2).setDivider(true); }

function section(text, thumbUrl) {
  return new SectionBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(text))
    .setThumbnailAccessory(new ThumbnailBuilder().setURL(thumbUrl || ICON.hosgeldin || ICON.hata));
}

function hataC(container) {
  return { components: [container.toJSON()], flags: V2_FLAGS };
}

function hataMesaji(metin) {
  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**HATA**\n\n' + metin, ICON.hata))
  );
}

function soruMesaji(soruVerisi, suankiIndex, toplamSoru) {
  var emojiListesi = ['\uD83D\uDD34', '\uD83D\uDFE1', '\uD83D\uDFE2', '\uD83D\uDD35', '\u26AB'];
  var soruEmojisi = emojiListesi[suankiIndex] || '\u26AA';
  var cubuk = '';
  var doluAdet = Math.round(((suankiIndex + 1) / toplamSoru) * 10);
  for (var c = 0; c < 10; c++) cubuk += c < doluAdet ? '\u2588' : '\u2591';

  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section(soruEmojisi + '  **SORU ' + soruVerisi.id + '**  \u2014  ' + soruVerisi.baslik, soruVerisi.icon))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('### ' + soruVerisi.soru + '\n\n> ' + soruVerisi.aciklama, ICON.soru))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('**\u0130lerleme:** `' + cubuk + '`  **' + (suankiIndex + 1) + '/' + toplamSoru + '**', ICON.ilerleme))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('Cevab\u0131n\u0131z\u0131 mesaj olarak yaz\u0131n ve g\u00F6nderin.\nBa\u015Fvuruyu iptal etmek i\u00E7in a\u015F\u011F\u0131daki butonu kullan\u0131n.', ICON.kalem))
      .addActionRowComponents(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('iptal_et').setLabel('Ba\u015Fvuruyu \u0130ptal Et').setEmoji('\u274C').setStyle(ButtonStyle.Danger)
        )
      )
  );
}

function soruDuzMetin(soruVerisi, suankiIndex, toplamSoru) {
  var cubuk = '';
  var doluAdet = Math.round(((suankiIndex + 1) / toplamSoru) * 10);
  for (var c = 0; c < 10; c++) cubuk += c < doluAdet ? '\u2588' : '\u2591';

  return (
    '**SORU ' + soruVerisi.id + ' \u2014 ' + soruVerisi.baslik + '**\n' +
    soruVerisi.soru + '\n> ' + soruVerisi.aciklama + '\n\n' +
    '**\u0130lerleme:** `' + cubuk + '` **' + (suankiIndex + 1) + '/' + toplamSoru + '**\n' +
    'Cevab\u0131n\u0131z\u0131 mesaj olarak yaz\u0131n ve g\u00F6nderin. Ba\u015Fvuruyu iptal etmek i\u00E7in a\u015F\u011F\u0131daki butonu kullan\u0131n.'
  );
}

function basvuruLogMesaji(kullanici, cevaplar) {
  var soruEmojileri = ['\uD83D\uDD34', '\uD83D\uDFE1', '\uD83D\uDFE2', '\uD83D\uDD35', '\u26AB'];
  var satirlar = [];
  for (var i = 0; i < cevaplar.length; i++) {
    satirlar.push(soruEmojileri[i] + '  **' + sorular[i].baslik + '**\n> ' + cevaplar[i].cevap);
  }

  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**YEN\u0130 YETK\u0130L\u0130 BA\u015EVURUSU**', kullanici.displayAvatarURL({ size: 128 })))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('**Ba\u015Fvuran Kullan\u0131c\u0131**\n> <@' + kullanici.id + '>\n> `' + kullanici.id + '`', ICON.kullanici))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('**Ba\u015Fvuru Formu**\n\n' + satirlar.join('\n\n'), ICON.form))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('A\u015F\u011F\u0131daki butonlar\u0131 kullanarak ba\u015Fvuruyu de\u011Ferlendirebilirsiniz.', ICON.bilgi))
      .addActionRowComponents(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('basvuru_kabul').setLabel('Kabul Et').setEmoji('\u2705').setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId('basvuru_reddet').setLabel('Reddet').setEmoji('\u274C').setStyle(ButtonStyle.Danger)
        )
      )
  );
}

function kabulMesaji(kullanici) {
  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**TEBR\u0130KLER, BA\u015EVURUNUZ KABUL ED\u0130LD\u0130!**', kullanici.displayAvatarURL({ size: 128 })))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('Ba\u015Farl\u0131 bir \u015Fekilde yetkili al\u0131m s\u00FCrecini tamamlad\u0131n\u0131z!\nArt\u0131k sunucumuzun yetkili ekibinin bir par\u00E7as\u0131s\u0131n\u0131z.', ICON.kabul))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('\u015Eimdi Yapman\u0131z Gerekenler:\n\u2022  Sunucu kurallar\u0131n\u0131 okuyun\n\u2022  Yetkili kanallar\u0131na g\u00F6z at\u0131n\n\u2022  Di\u011Fer yetkililerle tan\u0131\u015F\u0131n', ICON.bilgi))
  );
}

function redMesaji(kullanici) {
  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**BA\u015EVURUNUZ REDDED\u0130LD\u0130**', kullanici.displayAvatarURL({ size: 128 })))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('Maalesef ba\u015Fvurunuz yetkililer taraf\u0131ndan uygun bulunmam\u0131\u015Ft\u0131r.\nDaha sonra tekrar ba\u015Fvuruda bulunabilirsiniz.', ICON.red))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('\u00D6nerilerimiz:\n\u2022  Aktifli\u011Finizi art\u0131r\u0131n\n\u2022  Daha detayl\u0131 ve a\u00E7\u0131klay\u0131c\u0131 cevaplar verin\n\u2022  Tekrar deneyin, ba\u015Far\u0131ya ula\u015Facaks\u0131n\u0131z!', ICON.oneri))
  );
}

function tamamlandiMesaji() {
  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**BA\u015EVURUNUZ TAMAMLANDI!**', ICON.kabul))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('Ba\u015Fvurunuz ba\u015Far\u0131yla iletildi ve yetkililer taraf\u0131ndan\nincelenmi\u015Ftir. L\u00FCtfen sab\u0131rla sonu\u00E7 bekleyin.', ICON.bilgi))
  );
}

function zamanAsimiMesaji() {
  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**ZAMAN A\u015eIMI**', ICON.zaman))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('Ba\u015Fvurunuz zaman a\u015F\u0131m\u0131na u\u011Fram\u0131\u015Ft\u0131r.\nL\u00FCtfen daha h\u0131zl\u0131 cevap vererek tekrar deneyin.', ICON.hata))
  );
}

function iptalMesaji() {
  return hataC(
    new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**BA\u015EVURUNUZ \u0130PTAL ED\u0130LD\u0130**', ICON.red))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('Ba\u015Fvurunuz ba\u015Far\u0131yla iptal edilmi\u015Ftir.\n\u0130stedi\u011Finiz zaman tekrar ba\u015Fvurabilirsiniz.', ICON.bilgi))
  );
}

// ═══════════════════════════════════════════════════════════════════
//  BOT READY
// ═══════════════════════════════════════════════════════════════════
client.once('ready', async function () {
  console.log('Bot ba\u015Far\u0131yla giri\u015F yapt\u0131: ' + client.user.tag);
  console.log('Sunucular: ' + client.guilds.cache.size);

  var commands = commandFiles.map(function (f) {
    return require(path.join(__dirname, 'commands', f)).data.toJSON();
  });

  try {
    console.log('Slash komutlar\u0131 y\u00FCkleniyor...');
    await client.application.commands.set(commands);
    console.log('Slash komutlar\u0131 ba\u015Far\u0131yla y\u00FCklendi (global).');

    if (ayarlar.sunucuID) {
      var guild = await client.guilds.fetch(ayarlar.sunucuID).catch(function () { return null; });
      if (guild) {
        await guild.commands.set(commands);
        console.log('Slash komutlar\u0131 ' + guild.name + ' sunucusuna an\u0131nda y\u00FCklendi.');
      } else {
        console.log('Sunucu bulunamad\u0131, global kay\u0131t yeterli olacak.');
      }
    }
  } catch (error) {
    console.error('Komutlar y\u00FCklenirken hata:', error);
  }
});

// ═══════════════════════════════════════════════════════════════════
//  INTERACTION HANDLER
// ═══════════════════════════════════════════════════════════════════
client.on('interactionCreate', async function (interaction) {
  if (!interaction.isCommand() && !interaction.isButton()) return;

  // ── Slash Commands ──
  if (interaction.isCommand()) {
    var command = client.commands.get(interaction.commandName);
    if (!command) return;

    if (!ayarlar.sahipID.includes(interaction.user.id)) {
      return await interaction.reply({ ...hataMesaji('Bu komutu kullanmaya yetkiniz yok.'), ephemeral: true });
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error('Komut \u00E7al\u0131\u015Ft\u0131r\u0131l\u0131rken hata:', error);
      await interaction.reply({ ...hataMesaji('Komut \u00E7al\u0131\u015Ft\u0131r\u0131l\u0131rken bir hata olu\u015Ftu.'), ephemeral: true });
    }
  }

  // ── Ba\u015Fvuru Yap Butonu ──
  else if (interaction.isButton() && interaction.customId === 'basvuru_yap') {
    var userId = interaction.user.id;

    if (activeApplications.has(userId)) {
      return await interaction.reply({ ...hataMesaji('Zaten devam eden bir ba\u015Fvurunuz bulunmaktad\u0131r.'), ephemeral: true });
    }

    activeApplications.add(userId);
    var suankiSoru = 0;
    var dmChannel;

    try {
      dmChannel = await interaction.user.createDM();
    } catch (error) {
      console.error('DM kanal\u0131 a\u00E7\u0131lamad\u0131 (' + error.code + '):', error.message);
      activeApplications.delete(userId);
      return await interaction.reply({
        ...hataMesaji('DM kanal\u0131n\u0131z a\u00E7\u0131lamad\u0131. Gizlilik ayarlar\u0131n\u0131zdan DM iznini a\u00E7\u0131n ve botu engellemedi\u011Finizden emin olun.'),
        ephemeral: true,
      });
    }

    async function dmGonder(payload, duzMetin, duzComponentlar) {
      try {
        return await dmChannel.send(payload);
      } catch (error) {
        console.error('V2 DM mesaj\u0131 g\u00F6nderilemedi (' + error.code + '):', error.message + ' - d\u00FCz metin deneniyor');
        var secenek = { content: duzMetin };
        if (duzComponentlar) secenek.components = duzComponentlar;
        return await dmChannel.send(secenek);
      }
    }

    var iptalButonu = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('iptal_et').setLabel('Ba\u015Fvuruyu \u0130ptal Et').setEmoji('\u274C').setStyle(ButtonStyle.Danger)
    );

    var hosgeldinContainer = new ContainerBuilder()
      .setAccentColor(null)
      .addSectionComponents(section('**YETK\u0130L\u0130 BA\u015FVURU S\u00DCR\u00DC\u00C7\u00DC**', ICON.hosgeldin))
      .addSeparatorComponents(sepBig())
      .addSectionComponents(section('Ho\u015Fgeldiniz! Yetkili ba\u015Fvuru s\u00FCrecine\nho\u015F geldiniz. A\u015F\u011F\u0131daki sorular\u0131 cevaplayarak\nba\u015Fvurunuzu ba\u015Flatabilirsiniz.', ICON.bilgi))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('\u00D6NEML\u0130 B\u0130LG\u0130LER:\n\u2022  Her soru i\u00E7in 60 saniye s\u00FCreniz vard\u0131r\n\u2022  Cevaplar\u0131n\u0131z DM \u00FCzerinden iletilecektir\n\u2022  Diledi\u011Finiz zaman iptal edebilirsiniz', ICON.onemli))
      .addSeparatorComponents(sep())
      .addSectionComponents(section('**Toplam Soru Say\u0131s\u0131:** `' + sorular.length + '`', ICON.soru));

    var hosgeldinDuz =
      '**YETK\u0130L\u0130 BA\u015FVURU S\u00DCR\u00DC\u00C7\u00DC**\n\n' +
      'Ho\u015Fgeldiniz! A\u015F\u011F\u0131daki sorular\u0131 cevaplayarak ba\u015Fvurunuzu ba\u015Flatabilirsiniz.\n' +
      '\u2022  Her soru i\u00E7in 60 saniye s\u00FCreniz vard\u0131r\n' +
      '\u2022  Diledi\u011Finiz zaman iptal edebilirsiniz\n\n' +
      '**Toplam Soru Say\u0131s\u0131:** `' + sorular.length + '`';

    try {
      await dmGonder({ components: [hosgeldinContainer.toJSON()], flags: V2_FLAGS }, hosgeldinDuz);
      await dmGonder(soruMesaji(sorular[0], 0, sorular.length), soruDuzMetin(sorular[0], 0, sorular.length), [iptalButonu]);
    } catch (error) {
      console.error('DM mesaj\u0131 g\u00F6nderilemedi (' + error.code + '):', error.message);
      activeApplications.delete(userId);
      return await interaction.reply({
        ...hataMesaji('DM mesaj\u0131 g\u00F6nderilemedi. L\u00FCtfen gizlilik ayarlar\u0131n\u0131zdan DM iznini a\u00E7\u0131n ve botu engellemedi\u011Finizden emin olun.'),
        ephemeral: true,
      });
    }

    await interaction
      .reply({
        components: [
          new ContainerBuilder()
            .setAccentColor(null)
            .addSectionComponents(section('**BA\u015EVURU BA\u015FLATILDI**\n\nSorular DM \u00FCzerinden g\u00F6nderildi.\nL\u00FCtfen DM kutunuzu kontrol edin.', ICON.bilgi))
            .toJSON(),
        ],
        flags: V2_FLAGS,
        ephemeral: true,
      })
      .catch(function () {});

    var cevaplar = [];

    var filter = function (m) { return m.author.id === userId; };
    var collector = dmChannel.createMessageCollector({ filter: filter, time: 60000 });

    collector.on('collect', async function (m) {
      cevaplar.push({ soru: sorular[suankiSoru].soru, cevap: m.content });
      suankiSoru++;
      if (suankiSoru < sorular.length) {
        await dmGonder(soruMesaji(sorular[suankiSoru], suankiSoru, sorular.length), soruDuzMetin(sorular[suankiSoru], suankiSoru, sorular.length), [iptalButonu]);
      } else {
        collector.stop();
      }
    });

    collector.on('end', async function () {
      if (suankiSoru < sorular.length && activeApplications.has(userId)) {
        return dmChannel.send(zamanAsimiMesaji()).catch(function (e) {
          console.error('Zaman a\u015F\u0131m\u0131 mesaj\u0131 g\u00F6nderilemedi (' + e.code + '):', e.message);
        });
      }
      if (suankiSoru < sorular.length) return;

      try {
        if (!client.logChannelId) {
          console.error('Log kanal\u0131 ayarl\u0131 de\u011Fil. /yetkili-alim-ayarla komutuyla tekrar ayarlay\u0131n.');
        } else {
          var logChannel = await client.channels.fetch(client.logChannelId);
          await logChannel.send(basvuruLogMesaji(interaction.user, cevaplar));
        }
        await dmChannel.send(tamamlandiMesaji());
      } catch (error) {
        console.error('Log kanal\u0131 g\u00F6nderilirken hata:', error.message || error);
      } finally {
        activeApplications.delete(userId);
      }
    });
  }

  // ── \u0130ptal Et Butonu ──
  else if (interaction.isButton() && interaction.customId === 'iptal_et') {
    activeApplications.delete(interaction.user.id);
    await interaction.reply({ ...iptalMesaji(), ephemeral: true });
  }

  // ── Kabul / Red Butonlar\u0131 ──
  else if (interaction.isButton() && (interaction.customId === 'basvuru_kabul' || interaction.customId === 'basvuru_reddet')) {
    try {
      var mesaj = interaction.message;
      var containerComp = null;
      for (var ci = 0; ci < mesaj.components.length; ci++) {
        if (mesaj.components[ci].type === 17) { containerComp = mesaj.components[ci]; break; }
      }

      if (!containerComp) {
        return await interaction.reply({ ...hataMesaji('Ba\u015Fvuru verileri bulunamad\u0131.'), ephemeral: true });
      }

      var kullaniciSatiri = null;
      for (var ti = 0; ti < containerComp.components.length; ti++) {
        var comp = containerComp.components[ti];
        if (comp.type === 10 && comp.content && comp.content.indexOf('Ba\u015Fvuran Kullan\u0131c\u0131') !== -1) {
          kullaniciSatiri = comp;
          break;
        }
      }

      if (!kullaniciSatiri) {
        return await interaction.reply({ ...hataMesaji('Kullan\u0131c\u0131 bilgisi bulunamad\u0131.'), ephemeral: true });
      }

      var idMatch = kullaniciSatiri.content.match(/(\d{17,})/);
      if (!idMatch) {
        return await interaction.reply({ ...hataMesaji('Kullan\u0131c\u0131 ID format\u0131 ge\u00E7ersiz.'), ephemeral: true });
      }

      var hedefKullanici = await client.users.fetch(idMatch[1]).catch(function () { return null; });
      if (!hedefKullanici) {
        return await interaction.reply({ ...hataMesaji('Kullan\u0131c\u0131 bulunamad\u0131 veya ge\u00E7ersiz ID.'), ephemeral: true });
      }

      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return await interaction.reply({ ...hataMesaji('Bu butonu kullanmak i\u00E7in yeterli yetkiniz yok.'), ephemeral: true });
      }

      if (interaction.customId === 'basvuru_kabul') {
        var guildMember = await interaction.guild.members.fetch(hedefKullanici.id).catch(function () { return null; });
        if (guildMember && client.basvuruRoleId) {
          await guildMember.roles.add(client.basvuruRoleId).catch(function (e) {
            console.error('Rol verilemedi:', e.message || e);
          });
        } else if (!client.basvuruRoleId) {
          console.error('Yetkili rol\u0131 ayarl\u0131 de\u011Fil. /yetkili-alim-ayarla komutuyla tekrar ayarlay\u0131n.');
        }

        await hedefKullanici.send({ components: [kabulMesaji(hedefKullanici).components[0]], flags: V2_FLAGS }).catch(console.error);

        var guncelContainer = new ContainerBuilder()
          .setAccentColor(null)
          .addSectionComponents(section('**BA\u015EVURU KABUL ED\u0130LD\u0130**', hedefKullanici.displayAvatarURL({ size: 128 })))
          .addSeparatorComponents(sep())
          .addSectionComponents(section('**\u0130\u015Flemi G\u00E7ekle\u015Ftiren**\n> <@' + interaction.user.id + '>', interaction.user.displayAvatarURL({ size: 128 })))
          .addSeparatorComponents(sep())
          .addSectionComponents(section('**Ba\u015Fvuran**\n> <@' + hedefKullanici.id + '>', hedefKullanici.displayAvatarURL({ size: 128 })))
          .addSeparatorComponents(sep())
          .addSectionComponents(section('Yetkili r\u00FCl\u00FC ba\u015Far\u0131yla verildi.', ICON.kabul));

        await interaction.update({ components: [guncelContainer.toJSON()], flags: V2_FLAGS });
      }

      else if (interaction.customId === 'basvuru_reddet') {
        await hedefKullanici.send({ components: [redMesaji(hedefKullanici).components[0]], flags: V2_FLAGS }).catch(console.error);

        var guncelContainerRed = new ContainerBuilder()
          .setAccentColor(null)
          .addSectionComponents(section('**BA\u015EVURU REDDED\u0130LD\u0130**', hedefKullanici.displayAvatarURL({ size: 128 })))
          .addSeparatorComponents(sep())
          .addSectionComponents(section('**\u0130\u015Flemi G\u00E7ekle\u015Ftiren**\n> <@' + interaction.user.id + '>', interaction.user.displayAvatarURL({ size: 128 })))
          .addSeparatorComponents(sep())
          .addSectionComponents(section('**Ba\u015Fvuran**\n> <@' + hedefKullanici.id + '>', hedefKullanici.displayAvatarURL({ size: 128 })))
          .addSeparatorComponents(sep())
          .addSectionComponents(section('Ba\u015Fvuru ba\u015Far\u0131yla reddedildi.', ICON.red));

        await interaction.update({ components: [guncelContainerRed.toJSON()], flags: V2_FLAGS });
      }
    } catch (error) {
      console.error('Buton i\u015Flemi s\u0131ras\u0131nda hata olu\u015Ftu:', error);
    }
  }
});

client.login(ayarlar.token);
