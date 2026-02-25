class Cobra {
  constructor() {
    this.sections = new Array("services", "technology", "contact");
    // this.preferred_bsu = "gram";
    // this.preferred_thcu = "milligram_per_gram_thc";
    // this.preferred_cbdu = "milligram_per_gram_cbd";
    // this.preferred_usu = "gram_unit_size";
    // this.preferred_toc = "bag";
    // this.preferred_soc = "gallon";
    // this.preferred_tmc = "metrc_category_other";

    $(document).on("ready", this.document_ready.bind(this));
  }

  document_ready() {
    $(".nav_menu").on("click", this.big_menu_toggle.bind(this));
    $("#big_menu a").on("click", this.big_menu_toggle.bind(this));
    $("#big_menu_pricing a").on("click", this.big_menu_toggle.bind(this));
    $("#big_menu a").on("click", this.menu_animation.bind(this));
    $("#big_menu_pricing a").on("click", this.menu_animation.bind(this));
    $("#menu_button").on("click", this.menu_animation.bind(this));
    // $("#thc_target_potency").on("input", this.unit_size_reveal.bind(this));
    $(document).on("scroll", this.navbar_collapse.bind(this));

    $(function() {
      $(".harvest_process_date").datepicker({
        dateFormat: "yy-mm-dd"
      });
      $(".harvest_process_date").prop("autocomplete", "off");
    });

    $(document.body).on("cocoon:after-insert", (e, insertedItem) => {
      $(".harvest_process_date").datepicker({
        dateFormat: "yy-mm-dd"
      });
      $(".harvest_process_date").prop("autocomplete", "off");
    });

    // $(".harvest_process_date").on("click", function(e) {
    //    e.preventDefault();
    //    $(this).attr("autocomplete", "off");
    // });

    $("#edit_sample_request_button").on("click", (e) => {
      e.preventDefault();
      window.location = "/sample_requests/" + $("#edit_sample_request_button").attr("data-reference-number") + "/edit";
    });

    if ($("#cobra_home").length > 0) {
      $(document).on("scroll", this.animate_menu.bind(this));
      $(window).on("resize", this.animate_menu.bind(this));
      this.animate_anchor_scrolling();
    }

    if ($("#thc_target_potency").val()) { //
      $(".unit_size_entry").css("display", "block"); //
    } //

    // $(document.body).on("cocoon:after-insert", (e, insertedItem) => {
    //   this.setup_unit_stuff(insertedItem);
    // });

    // this.setup_unit_stuff(".nested-fields");
    this.setup_help_boxes();
    this.setup_unit_sizes(); //
  }

  // unit_size_reveal(e) {
  //   $(".unit_size_entry").css("display", "block");
  // }

  // setup_unit_stuff(nestedFields) {
  //   // BATCH SIZE UNIT
  //   const bsu = $(nestedFields).find(".batch_size_unit");
  //   bsu.val(this.preferred_bsu);
  //   if (this.preferred_bsu == "unit") {
  //     $(nestedFields).find(".unit_quantity_entry").removeClass("hidden");
  //   }

  setup_unit_sizes() { //
    $(document.body).on("cocoon:after-insert", (e, insertedItem) => { //
      $(".unit_size_entry").css("display", "block"); //

    // bsu.on("change", (e) => {
    //   this.preferred_bsu = bsu.val();
    //   if (bsu.val() == "unit") {
    //     $(nestedFields).find(".unit_quantity_entry").removeClass("hidden");
    //   }
    // });

    // // THC TARGET POTENCY UNIT
    // const thcu = $(nestedFields).find(".target_potency_thc_unit");
    // thcu.val(this.preferred_thcu);
    // if (this.preferred_thcu == "milligram_per_unit_thc") {
    //   $(nestedFields).find(".unit_size_entry").removeClass("hidden");
    // }

    // thcu.on("change", (e) => {
    //   this.preferred_thcu = thcu.val();
    //   if (thcu.val() == "milligram_per_unit_thc") {
    //     $(nestedFields).find(".unit_size_entry").removeClass("hidden");
    //   }
    // });

    // // CBD TARGET POTENCY UNIT
    // const cbdu = $(nestedFields).find(".target_potency_cbd_unit");
    // cbdu.val(this.preferred_cbdu);
    // cbdu.on("change", (e) => {
    //   this.preferred_cbdu = cbdu.val();
    // });

    // // METRC CATEGORY
    // const tmc = $(nestedFields).find(".the_metrc_category");
    // tmc.val(this.preferred_tmc);
    // tmc.on("change", (e) => {
    //   this.preferred_tmc = tmc.val();
    // });

    // // CONTAINER TYPE UNIT
    // const toc = $(nestedFields).find(".type_of_container");
    // toc.val(this.preferred_toc);
    // toc.on("change", (e) => {
    //   this.preferred_toc = toc.val();
    // });

    // // CONTAINER SIZE UNIT
    // const soc = $(nestedFields).find(".size_of_container");
    // soc.val(this.preferred_soc);
    // soc.on("change", (e) => {
    //   this.preferred_soc = soc.val();
    });

    // // UNIT SIZE UNIT
    // const usu = $(nestedFields).find(".unit_of_unit_size");
    // usu.val(this.preferred_usu);
    // usu.on("change", (e) => {
    //   this.preferred_usu = usu.val();
    // });

  }

  setup_help_boxes() {
    for (const helper_div of $(".helper")) {
      this.add_helpbox_events(helper_div);
    }

    $(document.body).on("cocoon:after-insert", (e, insertedItem) => {
      const new_helper_divs = insertedItem.find(".helper");
      for (const helper_div of new_helper_divs) {
        this.add_helpbox_events(helper_div);
      }
    });

    $(document.body).on("touchstart click", (e) => {
      const parent_helper_divs = $(e.target).closest(".helper");
      if (parent_helper_divs.length != 1 ) {
        $(".helper_content").removeClass("helper_content_open");
      }
    });
  }

  add_helpbox_events(helper_div) {
    const helper = $(helper_div);
    const content = helper.find(".helper_content");

    if (content) {
      helper.on("mouseenter touchstart", (e) => {
        $(".helper_content").removeClass("helper_content_open");
        content.addClass("helper_content_open");
      });

      content.on("mouseleave touchend click", (e) => {
        content.removeClass("helper_content_open");
      });
    }
  }

  menu_animation(e) {
    $("#menu_button").toggleClass("open");
  }

  navbar_collapse(e) {
    const scroll_top = $(window).scrollTop();
    if (scroll_top > 0) {
      $("#navbar").addClass("navbar_collapsed");
    } else {
      $("#navbar").removeClass("navbar_collapsed");
    }
  }

  big_menu_toggle(e) {
    const hidden_class = "big_menu_hidden";

    if ($("#big_menu").hasClass(hidden_class)) {
      $("#big_menu").removeClass(hidden_class);
    } else {
      $("#big_menu").addClass(hidden_class);
    }

    if ($("#big_menu_pricing").hasClass(hidden_class)) {
      $("#big_menu_pricing").removeClass(hidden_class);
    } else {
      $("#big_menu_pricing").addClass(hidden_class);
    }
  }

  animate_anchor_scrolling(e) {
    for (const section of this.sections) {
      $("#" + section + "_nav").on("click", (e) => {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: $("#" + section).offset().top
        }, 1000);
      });
      $("#" + section + "_footer").on("click", (e) => {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: $("#" + section).offset().top
        }, 1000);
      });
    }
  }

  animate_menu(e) {
    const extra_height = $(window).height() * 0.66;
    const scroll_top = $(window).scrollTop();
    const dead_zone = extra_height / 2.0;
    const active_class = "nav_link_active";

    if (scroll_top <= dead_zone) {
      for (const section of this.sections) {
        const element = $("#" + section + "_nav");
        if (element.hasClass(active_class) === true) {
          element.removeClass(active_class);
        }
      }
      return;
    }

    const deltas = new Object();

    let closest = "services";
    for (const section of this.sections) {
      if (deltas[section] < deltas[closest]) {
        closest = section;
      }
    }

    for (const section of this.sections) {
      const element = $("#" + section + "_nav");
      if (section === closest) {
        if (element.hasClass(active_class) === false) {
          element.addClass(active_class);
        }
      } else if (element.hasClass(active_class) === true) {
        element.removeClass(active_class);
      }
    }
  }
}

new Cobra();
