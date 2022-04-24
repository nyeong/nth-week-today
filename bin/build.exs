defmodule WeekNumber do
  Mix.install([:tzdata])

  def iso_week_number() do
    with {:ok, now} <- DateTime.now("Asia/Seoul", Tzdata.TimeZoneDatabase) do
      {_year, week_number} = :calendar.iso_week_number(
        {now.year, now.month, now.day}
      )
      week_number
    else
      _ ->
        {_year, week_number} = :calendar.iso_week_number()
        week_number
    end
  end
end

defmodule Build do
  @source_dir "src"
  @build_dir "dest"
  @static_files ~w(script.js style.css)
  @index_file "index.html.eex"
  
  defp build_image do
    week_num = WeekNumber.iso_week_number() |> to_string()
    System.cmd("node", ["./bin/generate-image.js", week_num])
  end
  
  defp copy_statics do
    Enum.each(@static_files, fn f ->
      source = Path.join(@source_dir, f)
      dest = Path.join(@build_dir, f)
      File.cp!(source, dest)
    end)
  end
  
  defp change_ext(path, origin, replacement) do
    String.replace(path, origin, replacement)
  end
  
  defp build_eex(assigns) when is_list(assigns) do
    source = Path.join(@source_dir, @index_file)
    dest = Path.join(@build_dir, @index_file)
    dest = change_ext(dest, ".html.eex", ".html")
    build = EEx.eval_file(source, assigns: assigns)
    File.write(dest, build)
  end

  def build do
    baseurl = "https://nyeong.github.io/nth-week-today/"
    week_number = WeekNumber.iso_week_number()
    image = baseurl <> "cover-W#{week_number}.jpg"

    File.rm_rf(@build_dir)
    File.mkdir(@build_dir)
    
    copy_statics()
    build_image()
    build_eex(
      og_title: "오늘은 몇 주차?",
      og_type: "website",
      og_url: baseurl,
      og_description: "오늘은 올해의 #{week_number}번째 주입니다!",
      og_image: image
    )
  end
end

Build.build()
