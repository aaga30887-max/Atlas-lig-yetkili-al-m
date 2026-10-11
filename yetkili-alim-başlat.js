const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SectionBuilder,
  ThumbnailBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yetkili-alim-ayarla')
    .setDescription('Yetkili al\u0131m\u0131n\u0131 ba\u015Flat\u0131r ve ba\u015Fvuru panelini olu\u015Fturur.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(function (option) {
      return option
        .setName('basvuru-kanali')
        .setDescription('Ba\u015Fvuru mesaj\u0131n\u0131n g\u00F6nderilece\u011Fi kanal')
        .setRequired(true);
    })
    .addChannelOption(function (option) {
      return option
        .setName('log-kanali')
        .setDescription('Ba\u015Fvurular\u0131n loglanaca\u011F\u0131 kanal')
        .setRequired(true);
    })
    .addRoleOption(function (option) {
      return option
        .setName('rol')
        .setDescription('Ba\u015Fvuru kabul edildi\u011Finde verilecek rol')
        .setRequired(true);
    }),

  async execute(interaction, client) {
    var basvuruKanali = interaction.options.getChannel('basvuru-kanali');
    var logKanali = interaction.options.getChannel('log-kanali');
    var rol = interaction.options.getRole('rol');

    client.logChannelId = logKanali.id;
    client.basvuruRoleId = rol.id;
    if (typeof client.veriKaydet === 'function') client.veriKaydet();

    var THUMBNAILS = {
      duyuru: 'https://cdn.discordapp.com/emojis/1529925187179384882.png?size=256',
      asamalar: 'https://cdn.discordapp.com/emojis/1529925268574179600.png?size=256',
      gereklilik: 'https://cdn.discordapp.com/emojis/1529925215272833284.png?size=256',
      bilgi: 'https://cdn.discordapp.com/emojis/1529925142556442795.gif?size=256',
    };

    var sectionDuyuru = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          ' <a:duyuru:1555268908246765640> **SUNUCUMUZA YETKILI ARANMAKTADIR!**\n' +
          '> Yetkili ekibimize kat\u0131lmak i\u00E7in a\u015F\u011F\u0131daki butona t\u0131klayarak\n' +
          '> ba\u015Fvuru s\u00FCrecini ba\u015Flatabilirsiniz.\n' +
          '> Ba\u015Fvuru DM \u00FCzerinden ger\u00E7ekle\u015Ftirilecektir.'
        )
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder().setURL(THUMBNAILS.duyuru)
      );

    var sectionAsamalar = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          ' <:yeniemoji:1555263618533294263> **BA\u015EVURU A\u015EAMALARI**\n' +
          '> <:Adsztasarm1:1555265537695817791> \u2776  DM \u00FCzerinden 5 soru y\u00F6neltilir\n' +
          '> <:asagili:1555265566036721775> \u2777  Cevaplar\u0131n\u0131z yetkililer taraf\u0131ndan incelenir\n' +
          '> <:asagili:1555265566036721775> \u2778  Ba\u015Fvurunuz de\u011Ferlendirilir ve sonu\u00E7 g\u00F6nderilir\n' +
          '> <:cizgiemoji:1555265592636866581> \u2779  **Stat sistemi ile ilerlemeniz takip edilir**'
        )
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder().setURL(THUMBNAILS.asamalar)
      );

    var sectionGereklilik = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          ' <a:ayarcik:1555268565232259125> **GEREKL\u0130L\u0130KLER**\n' +
          '> <:Adsztasarm1:1555265537695817791> Sunucuda aktif olman\u0131z beklenmektedir\n' +
          '> <:asagili:1555265566036721775> D\u00FCzg\u00FCn bir dil kullan\u0131m\u0131 gereklidir\n' +
          '> <:asagili:1555265566036721775> Yetkililerle sayg\u0131 \u00E7er\u00E7evesinde ileti\u015Fim kurulmal\u0131d\u0131r\n' +
          '> <:cizgiemoji:1555265592636866581> Ba\u015Fvuru s\u0131ras\u0131nda do\u011Fru ve a\u00E7\u0131klay\u0131c\u0131 cevaplar vermelisiniz'
        )
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder().setURL(THUMBNAILS.gereklilik)
      );

    var sectionBilgi = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          ' <a:soru_isareti:1555267928276860929> **B\u0130LG\u0130LEND\u0130RME**\n' +
          '> <:Adsztasarm1:1555265537695817791> Her soru i\u00E7in 60 saniye s\u00FCreniz vard\u0131r\n' +
          '> <:asagili:1555265566036721775> Cevaplar\u0131n\u0131z DM \u00FCzerinden iletilecektir\n' +
          '> <:cizgiemoji:1555265592636866581> Diledi\u011Finiz zaman iptal edebilirsiniz'
        )
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder().setURL(THUMBNAILS.bilgi)
      );

    var container = new ContainerBuilder()
      .setAccentColor(null)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('# <a:sadakatsizkalp:1550239879307460759> YETK\u0130L\u0130 ALIM PANEL\u0130')
      )
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(2).setDivider(true)
      )
      .addSectionComponents(sectionDuyuru)
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(2).setDivider(true)
      )
      .addSectionComponents(sectionAsamalar)
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(2).setDivider(true)
      )
      .addSectionComponents(sectionGereklilik)
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(2).setDivider(true)
      )
      .addSectionComponents(sectionBilgi)
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(2).setDivider(true)
      )
      .addActionRowComponents(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('basvuru_yap')
            .setLabel('Ba\u015Fvuru Yap')
            .setEmoji('<:SELyetkili3:1555267727760035960>')
            .setStyle(ButtonStyle.Success)
        )
      );

    await basvuruKanali.send({
      components: [container.toJSON()],
      flags: 32768,
    });

    var onayContainer = new ContainerBuilder()
      .setAccentColor(null)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('\u2705  **BA\u015EARILI**\n\nBa\u015Fvuru paneli ba\u015Far\u0131yla g\u00F6nderildi.')
      );

    await interaction.reply({
      components: [onayContainer.toJSON()],
      flags: 32768,
      ephemeral: true,
    });
  },
};
